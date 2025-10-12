'use client';

import { useEffect } from 'react';
import { useAccountBackground } from '@/app/hooks/useAccountBackground';

/**
 * Componente que aplica dinámicamente las clases de fondo según el tipo de cuenta del usuario
 */
export function DynamicBackground() {
  const { bodyClass } = useAccountBackground();

  useEffect(() => {
    // Remover clases anteriores del body
    document.body.classList.remove('bg-free-gradient', 'bg-premium-gradient');

    // Aplicar la clase correspondiente al tipo de cuenta
    document.body.classList.add(bodyClass);

    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove('bg-free-gradient', 'bg-premium-gradient');
    };
  }, [bodyClass]);

  // Este componente no renderiza nada, solo aplica estilos al body
  return null;
}

export default DynamicBackground;
