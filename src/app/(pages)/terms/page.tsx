'use client';

import { Button } from '@/app/components/ui/button';
import { CardContent } from '@/app/components/ui/card';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const { push } = useRouter();

  return (
    <div className="p-6 h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <CardContent className="space-y-4 g-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold">Términos de uso</h1>
        <p className="text-muted-foreground">
          Al crear una cuenta en Triviando, aceptás cumplir con estos términos y respetar las reglas
          de la plataforma.
        </p>

        <section>
          <h2 className="text-xl font-semibold mt-4">1. Responsabilidad de la cuenta</h2>
          <p className="text-muted-foreground">
            Sos responsable del contenido y comportamiento asociado a tu cuenta, incluyendo tu
            nombre de usuario y correo electrónico.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-4">2. Propiedad del contenido</h2>
          <p className="text-muted-foreground">
            Todo el contenido, preguntas y elementos visuales son propiedad intelectual de Triviando
            o sus creadores.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-4">3. Modificaciones</h2>
          <p className="text-muted-foreground">
            Estos términos pueden actualizarse en el futuro. El uso continuo de la plataforma
            implica aceptación de las nuevas versiones.
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
