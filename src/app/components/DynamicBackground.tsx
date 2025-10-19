'use client';

import { useEffect, useRef } from 'react';
import { useAccountBackground } from '@/app/hooks/useAccountBackground';

/**
 * Componente que aplica dinámicamente las clases de fondo según el tipo de cuenta del usuario
 */
export function DynamicBackground() {
  const { bodyClass } = useAccountBackground();
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    // Guardamos la referencia al body para evitar lecturas repetidas de document.
    const body = bodyRef.current ?? document.body;
    bodyRef.current = body;
    const removableClasses: string[] = ['bg-free-gradient', 'bg-premium-gradient'];

    // Remover clases anteriores del body
    body.classList.remove(...removableClasses);

    // Aplicar la clase correspondiente al tipo de cuenta si existe
    if (bodyClass) {
      body.classList.add(bodyClass);
    }

    // Cleanup al desmontar el componente
    return () => {
      if (!bodyRef.current) {
        return;
      }
      bodyRef.current.classList.remove(...removableClasses);
    };
  }, [bodyClass]);

  // Este componente no renderiza nada, solo aplica estilos al body
  return null;
}

export default DynamicBackground;
