import { playSound } from '@/app/utils/playSound';

export function getColorAndMessage(percentage: number): { message: string; color: string } {
  let message = '¡Inténtalo de nuevo!';
  let color = 'text-red-500';

  if (percentage >= 80) {
    message = '¡Excelente!';
    color = 'text-green-500';
    playSound('/sounds/excelent.mp3');
  } else if (percentage >= 60) {
    message = '¡Buen trabajo!';
    color = 'text-blue-500';
  } else if (percentage >= 40) {
    message = '¡No está mal!';
    color = 'text-yellow-500';
  } else {
    playSound('/sounds/looser.mp3');
  }

  return { message, color };
}
