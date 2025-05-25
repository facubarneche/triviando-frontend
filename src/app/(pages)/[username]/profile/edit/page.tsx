'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Camera, User, Mail, Lock, Save, Phone, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
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

// Códigos de país más comunes


// Mock data - en una aplicación real, esto vendría de una API o contexto
const userData = {
  username: 'QuizChampion',
  firstName: 'Carlos',
  lastName: 'Rodríguez',
  email: 'champion@example.com',
  countryCode: '+52',
  phoneNumber: '5551234567',
  birthDate: '1990-05-15',
  joinDate: 'Marzo 2023',
};

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    countryCode: userData.countryCode,
    phoneNumber: userData.phoneNumber,
    birthDate: userData.birthDate,
    currentPassword: '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simular llamada a API
    setTimeout(() => {
      console.log('Profile updated:', formData);
      setIsSubmitting(false);
      router.push('/profile');
      // Aquí actualizarías los datos del usuario en una aplicación real
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <header className="p-4">
        <Link
          href="/profile"
          className="inline-flex items-center text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Perfil
        </Link>
      </header>

      <main className="p-4 max-w-md mx-auto">
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
                    <Avatar className="w-24 h-24 border-4 border-cyan-200">
                      {avatarPreview ? (
                        <AvatarImage src={avatarPreview || '/placeholder.svg'} alt="Preview" />
                      ) : (
                        <>
                          <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                          <AvatarFallback className="text-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white">
                            {userData.firstName.charAt(0) + userData.lastName.charAt(0)}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <Label
                        htmlFor="avatar-upload"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white cursor-pointer hover:from-teal-500 hover:to-cyan-600 transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                        <span className="sr-only">Cambiar avatar</span>
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </div>
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
                  onClick={() => router.push('/profile')}
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
      </main>
    </div>
  );
}
