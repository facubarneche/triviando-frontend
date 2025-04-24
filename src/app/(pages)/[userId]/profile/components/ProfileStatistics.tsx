import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { UserStatistics } from '@/app/types/UserStatistics';
import { handleError } from '@/app/utils/errorHandler';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const ProfileStatistics = () => {
  const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(null);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      try {
        // Simulación de llamada al backend para obtener estadísticas del usuario
        // const userId = 1; // Obtener el ID desde cookies o JWT
        // const statistics = await userService.getUserStatistics(userId);
        // setUserData(statistics);

        //Mock data viene del endpoint getUserStatistics del userService
        setUserStatistics({
          totalQuizzes: 10,
          correctAnswers: 35,
          totalQuestions: 50,
        }); // Simulación de datos
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
  const accuracy = Math.round(
    (userStatistics.correctAnswers / userStatistics.totalQuestions) * 100,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#3c096c]">Total de Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#5a189a]">{userStatistics.totalQuizzes}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#3c096c]">Respuestas Correctas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#5a189a]">{userStatistics.correctAnswers}</p>
            <p className="text-sm text-muted-foreground">
              de {userStatistics.totalQuestions} preguntas
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#3c096c]">Precisión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#5a189a]">{accuracy}%</p>
            <Progress value={accuracy} className="h-2 mt-2 bg-[#9d4edd]/20" />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProfileStatistics;
