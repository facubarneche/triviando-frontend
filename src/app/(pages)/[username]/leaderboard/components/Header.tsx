'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

const Header = () => {
  const { username } = useParams();
  return (
    <header className="p-4">
      <Link
        href={`/${username}/topics`}
        className="inline-flex items-center text-white hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Temas
      </Link>
    </header>
  );
};

export default Header;
