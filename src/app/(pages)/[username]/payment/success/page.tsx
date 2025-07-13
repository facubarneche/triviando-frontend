'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { useParams } from 'next/navigation';

const PaymentSuccess = () => {
  const { username } = useParams();
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50">
      <Card className="w-full max-w-md border-green-400 shadow-lg">
        <CardHeader>
          <CardTitle className="text-green-700">¡Pago exitoso!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600 text-lg">
            Tu suscripción fue procesada correctamente. ¡Gracias por tu apoyo!
          </p>
        </CardContent>
        <CardFooter>
          <Link href={`/${username}/topics`}>
            <Button variant="default" className="bg-green-600 hover:bg-green-700">
              Volver al inicio
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
