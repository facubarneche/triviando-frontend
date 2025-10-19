'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProfileInfo from './components/ProfileInfo';
import ProfileStatistics from './components/ProfileStatistics';
import { useParams } from 'next/navigation';
import AnimatedContainer from '@/app/components/AnimatedContainer';

export default function Profile() {
  const { username } = useParams();
  return (
    <div className="min-h-screen">
      <AnimatedContainer animation="slideDown" delay={0}>
        <header className="p-4">
          <Link
            href={`/${username}/topics`}
            className="inline-flex items-center text-white hover:text-[#9d4edd] transition-colors cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Temas
          </Link>
        </header>
      </AnimatedContainer>

      <main className="w-full p-4 md:px-6 lg:px-8 xl:px-10 max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <AnimatedContainer animation="slideUp" delay={0.2}>
          <ProfileInfo />
        </AnimatedContainer>

        <AnimatedContainer animation="slideUp" delay={0.4}>
          <ProfileStatistics />
        </AnimatedContainer>
      </main>
    </div>
  );
}
