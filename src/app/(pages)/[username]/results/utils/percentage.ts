import { playSound } from '@/app/utils/playSound';

export function getColorAndMessage(percentage: number): { message: string; color: string } {
  let message = '¡Inténtalo de nuevo!';
  let color = 'text-red-500';

  if (percentage === 100) {
    message = '¡Excelente!';
    color = 'text-green-500';
    playSound('excellent');
  } else if (percentage >= 90) {
    message = '¡Muy bien!';
    color = 'text-green-400';
  } else if (percentage >= 75) {
    message = '¡Buen trabajo!';
    color = 'text-blue-500';
  } else if (percentage >= 60) {
    message = '¡Puedes mejorar!';
    color = 'text-gray-600'; // Cambiado de amarillo a gris oscuro
  } else if (percentage >= 40) {
    message = '¡Sigue practicando!';
    color = 'text-orange-500';
  } else {
    playSound('loser');
  }

  return { message, color };
}
