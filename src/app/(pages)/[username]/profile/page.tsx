'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProfileInfo from './components/ProfileInfo';
import ProfileStatistics from './components/ProfileStatistics';
import { useParams } from 'next/navigation';

export default function Profile() {
  const { username } = useParams();
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <header className="p-4">
        <Link
          href={`/${username}/topics`}
          className="inline-flex items-center text-white hover:text-[#9d4edd] transition-colors cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Temas
        </Link>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        <ProfileInfo />
        <ProfileStatistics />
      </main>
    </div>
  );
}
