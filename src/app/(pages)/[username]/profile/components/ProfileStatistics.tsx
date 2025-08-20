import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { loginService } from '@/app/services/loginService';
import { userService } from '@/app/services/userService';
import { handleError } from '@/app/utils/errorHandler';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { UserStatistics } from '../types';

const ProfileStatistics = () => {
  const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(null);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      try {
        const user = loginService.getUsuarioActual(); // Obtener el ID desde cookies o JWT
        if (!user) {
          handleError(new AxiosError('Usuario no autenticado', 'UNAUTHORIZED'));
          throw new Error('User is not logged in');
        }
        const statistics = await userService.getUserStatistics(user.id);
        setUserStatistics(statistics);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserStatistics();
  }, []);

  if (!userStatistics) {
    return <p>Cargando estadísticas...</p>; //Placeholder para la carga de datos
  }

  //Calcular la precisión como un porcentaje
  const accuracy =
    userStatistics.totalQuestions > 0
      ? Math.round((userStatistics.correctAnswers / userStatistics.totalQuestions) * 100)
      : 0;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-black">Total de Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#5a189a]">{userStatistics.totalQuizzes}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-black">Respuestas Correctas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#5a189a]">{userStatistics.correctAnswers}</p>
            <p className="text-sm text-muted-foreground text-gray-600">
              de {userStatistics.totalQuestions} preguntas
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-black">Precisión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#5a189a]">{accuracy}%</p>
            <Progress value={accuracy} className="h-2 mt-2 bg-[#9d4edd]/20" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileStatistics;
