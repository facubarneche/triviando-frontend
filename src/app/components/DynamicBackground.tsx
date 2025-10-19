'use client';

import { useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAccountBackground } from '@/app/hooks/useAccountBackground';

/**
 * Componente que aplica dinámicamente las clases de fondo según el tipo de cuenta del usuario
 */
export function DynamicBackground() {
  const { bodyClass } = useAccountBackground();
  const bodyRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  const isExcludedRoute = useMemo(() => {
    if (!pathname) {
      return false;
    }

    const excludedPrefixes = ['/login'];
    return excludedPrefixes.some((route) => pathname.startsWith(route));
  }, [pathname]);

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

    if (!isExcludedRoute && bodyClass) {
      // Aplicar la clase correspondiente al tipo de cuenta si corresponde a la ruta actual
      body.classList.add(bodyClass);
    }

    // Cleanup al desmontar el componente
    return () => {
      if (!bodyRef.current) {
        return;
      }
      bodyRef.current.classList.remove(...removableClasses);
    };
  }, [bodyClass, isExcludedRoute]);

  // Este componente no renderiza nada, solo aplica estilos al body
  return null;
}

export default DynamicBackground;
