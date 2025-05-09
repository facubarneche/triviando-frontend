'use client';

import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';

const ButtonPosition = () => {
  const { push } = useRouter();

  return (
    <div className="relative w-full h-9 md:h-4">
      <Button
        className="absolute top-1 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium px-4 py-2 transition-all duration-300 hover:scale-105 flex items-center gap-2"
        onClick={() => push('?')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        Mi Posición
      </Button>
    </div>
  );
};

export default ButtonPosition;
