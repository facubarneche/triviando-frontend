import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { loginService } from '@/app/services/loginService';
import { userService } from '@/app/services/userService';
import { handleError } from '@/app/utils/errorHandler';
import { formatDateToMonthYear } from '@/app/utils/formatDateToMonthYear';
import { motion } from 'framer-motion';
import { Edit, LogOut } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { UserResponse } from '../types/UserResponse';

const ProfileInfo = () => {
  //Debe venir del backend con el endpoint getUserRegisterDate del userService
  const [joinDate, setJoinDate] = useState('');
  //   const joinDate = getUserRegisterDate(userData.id);  Simulación de llamada al backend
  //User mock data
  // const userData = {
  //   username: 'QuizChampion', //Lo tengo en las cookies
  //   firstName: 'Carlos', //Lo tengo en las cookies
  //   lastName: 'Rodríguez', //Lo tengo en las cookies
  //   email: 'champion@example.com', //Lo tengo en las cookies
  //   joinDate: 'Marzo 2023',
  // };

  //Agarrar username de la url
  const { username } = useParams();

  const [userLogged, setUserLogged] = useState<UserResponse | null>(null);

  //TODO: Conectar con el backend para obtener la fecha de registro del usuario y cambiar las variables
  useEffect(() => {
    const fetchJoinDate = async () => {
      try {
        const userLogged = await userService.getUserById(loginService.getUserId());
        setUserLogged(userLogged); // Debugging line // Debugging line
        //Obtengo el ID desde cookies o JWT
        // const userId = 1;
        // const date = await userService.getUserRegisterDate(userId);
        //Hardcodeo un valor para simular la llamada al backend'
        //Date en formato ISO
        const date = '2023-03-15T00:00:00Z'; // Simulación de fecha de registro
        setJoinDate(formatDateToMonthYear(date));
      } catch (error) {
        handleError(error);
      }
    };

    fetchJoinDate();
  }, []);

  const router = useRouter();

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
                {userLogged?.fullName?.charAt(0) || ''}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-[#3c096c]">{username}</h1>
                <Badge
                  variant="outline"
                  className="bg-[#9d4edd]/10 text-[#5a189a] border-[#9d4edd]/30 self-center"
                >
                  Quiz Master
                </Badge>
              </div>
              {userLogged && (
                <h2 className="text-lg font-medium text-[#5a189a] mb-1">{userLogged.fullName}</h2>
              )}
              {userLogged && <p className="text-muted-foreground">{userLogged.email}</p>}
              <p className="text-sm text-muted-foreground text-gray-600 mt-2">
                Miembro desde {joinDate}
              </p>

              <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 border-[#9d4edd] hover:bg-[#9d4edd]/10 text-[#5a189a]"
                  //TODO: Ajustar la ruta de edición de perfil (currentPath + '/edit')
                  onClick={() => router.push('/profile/edit')}
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
