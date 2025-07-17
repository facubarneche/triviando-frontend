'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useParams } from 'next/navigation';

export default function PaymentFailure() {
  const { username } = useParams();

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50">
      <Card className="w-full max-w-md border-red-400 shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-700">Pago rechazado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 text-lg">
            No pudimos procesar tu suscripción. Por favor, intentá nuevamente o probá con otro
            método de pago.
          </p>
        </CardContent>
        <CardFooter>
          <Link href={`/${username}/topics`}>
            <Button variant="default" className="bg-red-600 hover:bg-red-700">
              Volver al inicio
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
