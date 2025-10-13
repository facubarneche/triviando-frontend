import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { loginService } from '@/app/services/loginService';
import { userService } from '@/app/services/userService';
import { handleError } from '@/app/utils/errorHandler';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { UserStatistics } from '../types';
import AnimatedContainer from '@/app/components/AnimatedContainer';

const ProfileStatistics = () => {
  const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(null);
  const cardBaseClasses = 'border-0 shadow-lg bg-white/95 h-full hover:shadow-lg flex flex-col';
  const headerBaseClasses =
    'flex-1 flex flex-col items-center justify-center text-center px-4 pb-2';
  const contentBaseClasses = 'flex-1 flex flex-col items-center justify-center text-center gap-3';

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
        <AnimatedContainer animation="scale" delay={0.1} className="h-full">
          <Card className={cardBaseClasses}>
            <CardHeader className={headerBaseClasses}>
              <CardTitle className="text-lg text-slate-600">Total de Quizzes</CardTitle>
            </CardHeader>
            <CardContent className={contentBaseClasses}>
              <p className="text-3xl font-bold text-[#5a189a]">{userStatistics.totalQuizzes}</p>
            </CardContent>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer animation="scale" delay={0.2} className="h-full">
          <Card className={cardBaseClasses}>
            <CardHeader className={headerBaseClasses}>
              <CardTitle className="text-lg text-slate-600">Respuestas Correctas</CardTitle>
            </CardHeader>
            <CardContent className={`${contentBaseClasses} gap-2`}>
              <p className="text-3xl font-bold text-[#5a189a]">{userStatistics.correctAnswers}</p>
              <p className="text-sm text-muted-foreground text-gray-600">
                de {userStatistics.totalQuestions} preguntas
              </p>
            </CardContent>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer animation="scale" delay={0.3} className="h-full">
          <Card className={cardBaseClasses}>
            <CardHeader className={headerBaseClasses}>
              <CardTitle className="text-lg text-slate-600">Precisión</CardTitle>
            </CardHeader>
            <CardContent className={contentBaseClasses}>
              <p className="text-3xl font-bold text-[#5a189a]">{accuracy}%</p>
              <Progress value={accuracy} className="h-2 mt-2 bg-[#9d4edd]/20" />
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default ProfileStatistics;
