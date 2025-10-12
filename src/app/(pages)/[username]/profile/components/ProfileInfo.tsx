import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { CloudinaryAvatar } from '@/app/components/CloudinaryAvatar';
import { userService } from '@/app/services/userService';
import { handleError } from '@/app/utils/errorHandler';
import { formatDateToMonthYear } from '@/app/utils/formatDateToMonthYear';
import { Edit, LogOut } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import type { IUserData } from '@/app/services/userService';

import { useCurrentUser } from '@/app/utils/auth';
import { useUserAvatar } from '@/app/hooks/useUserAvatar';
import { ProfileInfoSkeleton } from './ProfileInfoSkeleton';
import AnimatedContainer from '@/app/components/AnimatedContainer';

const ProfileInfo = () => {
  const { username } = useParams();
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Avatar del usuario usando el hook personalizado
  const { avatarPublicId } = useUserAvatar();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Si username es string, buscar por username, si es id, parsear a number
        // Pero getUserById espera un number (id), así que hay que obtener el id del usuario logueado
        // Si el perfil es el propio, usamos currentUser?.id, si no, habría que buscar por username
        let userId: number;
        if (currentUser?.username === username) {
          if (!currentUser?.id) {
            setUser(null);
            setLoading(false);
            return;
          }
          userId = currentUser.id;
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
  }, [username, currentUser?.id, currentUser?.username]);

  const onLogOut = () => {
    // Elimina la cookie 'usuario'
    document.cookie = 'usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  if (loading) {
    return <ProfileInfoSkeleton />;
  }

  if (!user) {
    return (
      <Card variant="solid" className="mb-6 border-0 shadow-lg hover:shadow-lg">
        <CardContent className="p-6 text-center text-gray-500">
          No se pudo cargar el perfil.
        </CardContent>
      </Card>
    );
  }

  const getDisplayName = () => {
    const name = user.name?.trim();
    const lastName = user.lastName?.trim();

    if (!name && !lastName) return 'Usuario Anónimo';

    return [name, lastName].filter(Boolean).join(' ').trim();
  };

  const fullName = getDisplayName();

  return (
    <div>
      <Card variant="solid" className="mb-6 border-0 shadow-lg hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <AnimatedContainer animation="scale" delay={0.1}>
              <CloudinaryAvatar
                publicId={currentUser?.avatar || avatarPublicId || user.avatar}
                fallbackText={
                  fullName
                    ? fullName.charAt(0) || ''
                    : user.username?.charAt(0) || user.email.charAt(0)
                }
                className="w-24 h-24 border-4 border-[#9d4edd]/30"
                size={96}
                alt="Avatar del usuario"
              />
            </AnimatedContainer>

            <div className="flex-1 text-center sm:text-left">
              <AnimatedContainer animation="slideLeft" delay={0.2}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-[#3c096c]">{user.username}</h1>
                  <Badge
                    variant="outline"
                    className="bg-[#9d4edd]/10 text-[#5a189a] border-[#9d4edd]/30 self-center"
                  >
                    Quiz Master
                  </Badge>
                </div>
              </AnimatedContainer>

              <AnimatedContainer animation="slideLeft" delay={0.3}>
                {fullName && (
                  <h2 className="text-lg font-medium text-[#5a189a] mb-1">{fullName}</h2>
                )}
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground text-gray-600 mt-2">
                  Miembro desde {formatDateToMonthYear(user.joinDate)}
                </p>
              </AnimatedContainer>

              <AnimatedContainer animation="slideUp" delay={0.4}>
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
                    onClick={onLogOut}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInfo;
