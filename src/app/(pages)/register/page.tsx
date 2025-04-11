import Link from 'next/link';
import FormRegister from './components/FormRegister';
import Header from './components/Header';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-4">
      <div className="w-full max-w-md z-10">
        <Link
          href="/"
          className="inline-flex items-center text-white mb-6 hover:text-cyan-100 font-bold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio de sesión
        </Link>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <Header />
          <FormRegister />
        </Card>
      </div>
    </div>
  );
}
