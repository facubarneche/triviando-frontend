'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Camera, User, Mail, Lock, Save, Phone, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';
import { CloudinaryAvatar } from '@/app/components/CloudinaryAvatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { motion } from 'framer-motion';
import { countryCodes } from '@/app/utils/countryCodes';
import { userService } from '@/app/services/userService';

import { handleError } from '@/app/utils/errorHandler';
import { useUserStore } from '@/app/stores/userStore';
import { cloudinaryAvatarService } from '@/app/services/cloudinaryAvatarService';
import { useUserAvatar } from '@/app/hooks/useUserAvatar';
import type { IUserData, IUpdateUserData } from '@/app/services/userService';
import ProfileEditSkeleton from './ProfileEditSkeleton';
import { toast } from 'react-toastify';

export default function EditProfile() {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    birthDate: '',
    currentPassword: '',
  });
  const [originalUsername, setOriginalUsername] = useState('');
  const router = useRouter();

  // Hook para manejar el avatar del usuario
  const { avatarPublicId, updateAvatar } = useUserAvatar();

  // Zustand store
  const { user, updateUser } = useUserStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      const userData = await userService.getUserById(user.id);
      setUserData(userData);
      setOriginalUsername(userData.username || '');

      if (userData) {
        let birthDate = userData.birthDate || '';
        if (!birthDate && userData.age) {
          const today = new Date();
          const birthYear = today.getFullYear() - userData.age;
          birthDate = `${birthYear}-07-01`;
        }
        setFormData({
          username: userData.username || '',
          firstName: userData.name || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          countryCode: (userData.countryCode || '').trim(),
          phoneNumber: (userData.phoneNumber || '').replace(/[^0-9]/g, ''), // Limpia guiones y otros caracteres
          birthDate,
          currentPassword: '',
        });
      }
    };
    fetchUserData();
  }, [user?.avatar, user?.id]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Restringimos " y '
    if (name === 'username') {
      newValue = newValue.replace(/[^a-zA-Z0-9_]/g, '');
    }
    // Solo números para phoneNumber
    if (name === 'phoneNumber') {
      newValue = newValue.replace(/[^0-9]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error cuando el usuario selecciona
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.countryCode) {
      newErrors.countryCode = 'Selecciona un código de país';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'El número de teléfono es obligatorio';
    } else if (!/^\d{7,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'El número de teléfono debe tener entre 7 y 15 dígitos';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        newErrors.birthDate = 'Debes tener al menos 13 años para usar la aplicación';
      } else if (age > 120) {
        newErrors.birthDate = 'Por favor, ingresa una fecha de nacimiento válida';
      }
    }

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Debes ingresar tu contraseña actual para confirmar los cambios';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    if (!userData) {
      setIsSubmitting(false);
      setErrors({ general: 'No se pudo obtener el usuario.' });
      return;
    }

    const updatedUser: IUpdateUserData = {
      id: userData.id,
      name: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      birthDate: formData.birthDate,
      phoneNumber: formData.phoneNumber,
      countryCode: formData.countryCode,
      currentPassword: formData.currentPassword,
      avatar: avatarPublicId || userData.avatar,
    };

    try {
      await userService.editUserById(updatedUser);

      // Actualizar el store de Zustand con los nuevos datos
      updateUser({
        name: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        avatar: avatarPublicId || userData.avatar,
      });

      setIsSubmitting(false);
      toast.success('Perfil actualizado correctamente');
      router.push(`/${formData.username}/profile`);
    } catch (error) {
      setIsSubmitting(false);
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <header className="p-4">
        <Link
          href={`/${formData.username}/profile`}
          className="inline-flex items-center text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Perfil
        </Link>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {userData === null ? (
          <ProfileEditSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-700">Editar Perfil</CardTitle>
                <CardDescription>
                  Actualiza tu información personal. Necesitarás tu contraseña actual para confirmar
                  los cambios.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="relative">
                      <CloudinaryAvatar
                        publicId={avatarPublicId || undefined}
                        fallbackText={
                          ((userData?.name || '') + ' ' + (userData?.lastName || '')).trim() ||
                          userData?.username?.charAt(0) ||
                          'U'
                        }
                        className="w-24 h-24"
                        size={96}
                        alt="Avatar del usuario"
                      />
                      <CldUploadWidget
                        uploadPreset="avatar_preset"
                        options={cloudinaryAvatarService.getUploadOptions()}
                        onSuccess={(result) => {
                          if (typeof result.info === 'object' && result.info.public_id) {
                            const publicId = result.info.public_id;
                            // Usar el hook para actualizar el avatar
                            updateAvatar(publicId);
                            toast.success('Avatar actualizado correctamente');
                          }
                        }}
                      >
                        {({ open }) => (
                          <div className="absolute bottom-0 right-0">
                            <Button
                              type="button"
                              onClick={() => open()}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:from-teal-500 hover:to-cyan-600 transition-colors p-0"
                            >
                              <Camera className="h-4 w-4" />
                              <span className="sr-only">Cambiar avatar</span>
                            </Button>
                          </div>
                        )}
                      </CldUploadWidget>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Haz clic en el ícono para cambiar tu foto
                    </p>
                  </div>

                  {/* Nombre y Apellido en la misma fila */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-cyan-700">
                        Nombre
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`border-cyan-200 focus:border-cyan-400 ${
                          errors.firstName ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-cyan-700">
                        Apellido
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`border-cyan-200 focus:border-cyan-400 ${
                          errors.lastName ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-cyan-700 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nombre de usuario
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`border-cyan-200 focus:border-cyan-400 ${
                        errors.username ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-cyan-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`border-cyan-200 focus:border-cyan-400 ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Teléfono con código de país */}
                  <div className="space-y-2">
                    <Label className="text-cyan-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Número de teléfono
                    </Label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.countryCode}
                        onValueChange={(value) => handleSelectChange('countryCode', value)}
                      >
                        <SelectTrigger
                          className={`w-[120px] border-cyan-200 focus:border-cyan-400 ${
                            errors.countryCode ? 'border-red-500' : ''
                          }`}
                        >
                          <SelectValue placeholder="Código" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="1234567890"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`flex-1 border-cyan-200 focus:border-cyan-400 ${
                          errors.phoneNumber ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {(errors.countryCode || errors.phoneNumber) && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.countryCode || errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Fecha de nacimiento */}
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-cyan-700 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Fecha de nacimiento
                    </Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      max={new Date().toISOString().split('T')[0]} // No permitir fechas futuras
                      className={`border-cyan-200 focus:border-cyan-400 ${
                        errors.birthDate ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.birthDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-cyan-200">
                    <h3 className="text-cyan-700 font-medium mb-2">Confirmación de seguridad</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Por tu seguridad, necesitamos que confirmes tu contraseña actual antes de
                      guardar los cambios.
                    </p>

                    <div className="space-y-2">
                      <Label
                        htmlFor="currentPassword"
                        className="text-cyan-700 flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        Contraseña actual
                      </Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        placeholder="Ingresa tu contraseña actual"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className={`border-cyan-200 focus:border-cyan-400 ${
                          errors.currentPassword ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.currentPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(`/${originalUsername}/profile`)}
                    className="border-cyan-200 hover:bg-cyan-50 text-cyan-700"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear',
                          }}
                        />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
