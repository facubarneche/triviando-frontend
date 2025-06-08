import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { userService } from '@/app/services/userService';
import { handleError } from '@/app/utils/errorHandler';
import { formatDateToMonthYear } from '@/app/utils/formatDateToMonthYear';
import { motion } from 'framer-motion';
import { Edit, LogOut } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import type { IUserData } from '@/app/services/userService';
import { loginService } from '@/app/services/loginService';
import { ProfileInfoSkeleton } from './ProfileInfoSkeleton';



const ProfileInfo = () => {
  const { username } = useParams();
  const [user, setUser] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Si username es string, buscar por username, si es id, parsear a number
        // Pero getUserById espera un number (id), así que hay que obtener el id del usuario logueado
        // Si el perfil es el propio, usamos loginService.getUserId(), si no, habría que buscar por username
        let userId: number;
        if (loginService.getUsuarioActual()?.username === username) {
          userId = loginService.getUserId();
        } else {
          // Si no es el usuario logueado, habría que buscar el id por username (no implementado aquí)
          setUser(null);
          setLoading(false);
          return;
        }
        const userData = await userService.getUserById(userId);
        setUser(userData);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) {
    return <ProfileInfoSkeleton />;
  }

  if (!user) {
    return (
      <Card className="mb-6 border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6 text-center text-gray-500">
          No se pudo cargar el perfil.
        </CardContent>
      </Card>
    );
  }

  const fullName = [user.name, user.lastName].filter(Boolean).join(' ').trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6 border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-[#9d4edd]/30">
              <AvatarImage src="/placeholder-user.jpg" alt="@user" />
              <AvatarFallback className="text-2xl text-purple-900 text-white">
                {fullName ? fullName.charAt(0) : user.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-[#3c096c]">{user.username}</h1>
                <Badge
                  variant="outline"
                  className="bg-[#9d4edd]/10 text-[#5a189a] border-[#9d4edd]/30 self-center"
                >
                  Quiz Master
                </Badge>
              </div>
              {fullName && <h2 className="text-lg font-medium text-[#5a189a] mb-1">{fullName}</h2>}
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground text-gray-600 mt-2">
                Miembro desde {formatDateToMonthYear(user.joinDate)}
              </p>
              <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 border-[#9d4edd] hover:bg-[#9d4edd]/10 text-[#5a189a]"
                  onClick={() => router.push(`/${user.username}/profile/edit`)}
                >
                  <Edit className="h-4 w-4" />
                  Editar Perfil
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 text-red-500 border-red-200 hover:bg-red-100 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileInfo;
