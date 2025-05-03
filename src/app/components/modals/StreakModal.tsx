'use client';

import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

interface StreakData {
  racha: boolean;
  diasConsecutivos: string;
}

export function StreakModal() {
  const [open, setOpen] = useState(false);
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  useEffect(() => {
    const checkStreak = async () => {
      try {
        // Simulación de respuesta del backend (hardcodeada)
        // Esto se reemplazará luego por la llamada real a userService
        const mockResponse: StreakData = {
          racha: true,
          diasConsecutivos: '5',
        };
        setStreakData(mockResponse);

        //Luego utilizar el servicio real
        //const data = await userService.getStreak();
        //setStreakData(data);
        //Si hay racha se abre el modal, sino simplemente aparecen los topicos
        //if (data.racha) setOpen(true);
      } catch (error) {
        console.error('Error al verificar la racha:', error);
        //handleError(error);
      }
    };

    //Verificar la racha al cargar el componente
    checkStreak();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            ¡Racha de días consecutivos!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center">
              <Flame className="h-16 w-16 text-orange-500" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
              {streakData?.diasConsecutivos}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center">¡Felicitaciones!</h3>
          <p className="text-center text-muted-foreground">
            Has ingresado a la aplicación durante {streakData?.diasConsecutivos} días consecutivos.
            ¡Sigue así para mantener tu racha!
          </p>
          <Button className="mt-4 bg-orange-500 hover:bg-orange-600" onClick={() => setOpen(false)}>
            ¡Genial!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
