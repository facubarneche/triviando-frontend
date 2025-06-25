'use client';

import * as React from 'react';
import * as Progress from '@radix-ui/react-progress';

type LoaderProps = {
  readonly label?: string;
  readonly size?: number;
};

export default function Loader({ label = 'Cargando...', size = 48 }: LoaderProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <Progress.Root
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#f3f3f3',
        }}
        value={null}
      >
        <Progress.Indicator
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'conic-gradient(#6366f1 0% 60%, #e5e7eb 60% 100%)',
            animation: 'spin 1s linear infinite',
          }}
        />
      </Progress.Root>
      <span style={{ fontSize: 14, color: '#6366f1' }}>{label}</span>
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
