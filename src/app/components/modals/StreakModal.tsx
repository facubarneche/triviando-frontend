'use client';
import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { userService } from '@/app/services/userService';
import { useUserStore } from '@/app/stores/userStore';

interface StreakData {
  rachaActual: number;
}

//TODO: Hacer responsive el modal en mobile

export function StreakModal() {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  useEffect(() => {
    const checkStreak = async () => {
      if (!user?.id) return;

      try {
        // Simulación de respuesta del backend (hardcodeada)
        // Esto se reemplazará luego por la llamada real a userService
        // const mockResponse: StreakData = {
        //   rachaActual: '5',
        // };
        // setStreakData(mockResponse);

        //TODO: Luego utilizar el servicio real
        const userId = user.id;
        const data = await userService.getStreak(userId);
        setStreakData(data);
        //Si hay racha se abre el modal, sino simplemente aparecen los topicos
        //if (data.racha) setOpen(true);

        //Persisto la fecha de la última vez que se mostró el modal
        const today = new Date().toISOString().split('T')[0];
        const lastShownDate = localStorage.getItem('streakModalLastShown');

        //Muestro modal solo si no se mostró hoy
        if (lastShownDate !== today) {
          setOpen(true);
        }
      } catch {
        //Error al verificar la racha, continuar silenciosamente
      }
    };

    //Verificar la racha al cargar el componente
    checkStreak();
  }, [user?.id]);

  const handleClose = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('streakModalLastShown', today);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            ¡Racha de días consecutivos!
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-teal-100 flex items-center justify-center">
              <Flame className="h-16 w-16 text-red-800" />
            </div>
            <div className="absolute -top-2 -right-2 bg-cyan-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
              {streakData?.rachaActual}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center">¡Felicitaciones!</h3>
          <p className="text-center text-muted-foreground text-gray-600">
            Has ingresado a la aplicación durante {streakData?.rachaActual} días consecutivos.
            ¡Sigue así para mantener tu racha!
          </p>
          <Button
            type="button"
            variant="outline"
            className="bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg text-white"
            onClick={handleClose}
          >
            ¡Genial!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
