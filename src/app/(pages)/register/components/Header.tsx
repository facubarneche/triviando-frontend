import { CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import React from 'react';

const Header = () => {
  return (
    <CardHeader className="space-y-1 cursor-default">
      <CardTitle className="text-2xl font-bold text-center">Crear una cuenta</CardTitle>
      <CardDescription className="text-center">
        Únete a Flashcards y pon a prueba tus conocimientos
      </CardDescription>
    </CardHeader>
  );
};

export default Header;
