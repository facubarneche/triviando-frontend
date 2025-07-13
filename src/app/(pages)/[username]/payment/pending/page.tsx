'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useParams } from 'next/navigation';

export default function PaymentPending() {
  const { username } = useParams();

  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-50">
      <Card className="w-full max-w-md border-yellow-400 shadow-lg">
        <CardHeader>
          <CardTitle className="text-yellow-700">Pago pendiente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-600 text-lg">
            Tu pago está siendo procesado. Te notificaremos cuando se acredite correctamente.
          </p>
        </CardContent>
        <CardFooter>
          <Link href={`/${username}/topics`}>
            <Button variant="default" className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900">
              Volver al inicio
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
