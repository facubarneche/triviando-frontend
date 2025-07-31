'use client';

import { Button } from '@/app/components/ui/button';
import { CardContent } from '@/app/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PolicyPage() {
  const { push } = useRouter();

  return (
    <div className="p-6 h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <CardContent className="space-y-4 g-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold">Política de convivencia</h1>
        <p className="text-muted-foreground">
          Triviando es un espacio para aprender y divertirse. Queremos que sea seguro, inclusivo y
          respetuoso para todas las personas.
        </p>

        <section>
          <h2 className="text-xl font-semibold mt-4">1. Conductas prohibidas</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Usuarios o correos ofensivos o discriminatorios</li>
            <li>Spam, acoso o lenguaje de odio</li>
            <li>Suplantación de identidad o comportamiento malicioso</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-4">2. Moderación</h2>
          <p className="text-muted-foreground">
            Las cuentas que violen esta política podrán ser suspendidas o eliminadas sin previo
            aviso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-4">3. Reportes</h2>
          <p className="text-muted-foreground">
            Si ves algo inapropiado, podés avisarnos escribiendo a{' '}
            <Link href="mailto:soporte@triviando.com" className="underline text-blue-600">
              soporte@triviando.com
            </Link>
          </p>
        </section>

        <Button
          className="w-full bg-teal-400 shadow-md hover:shadow-lg text-white font-bold cursor-pointer mt-3"
          onClick={() => push('/register')}
        >
          Volver al registro
        </Button>
      </CardContent>
    </div>
  );
}
