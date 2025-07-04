import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug: Verificar que las variables de entorno estén cargadas
console.log('Cloudinary config check:', {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY
    ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4)
    : 'undefined',
  api_secret: process.env.CLOUDINARY_API_SECRET
    ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4)
    : 'undefined',
});

// Debug: Verificar configuración de cloudinary
const config = cloudinary.config();
console.log('Cloudinary SDK config:', {
  cloud_name: config.cloud_name,
  api_key: config.api_key ? '***' + String(config.api_key).slice(-4) : 'undefined',
  api_secret: config.api_secret ? '***' + String(config.api_secret).slice(-4) : 'undefined',
});

/**
 * GET /api/user/avatar?userId=123
 * Busca el avatar de un usuario en Cloudinary usando el user_id en los metadatos
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log('Searching avatar for userId:', userId);

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Buscar recursos en Cloudinary usando el tag del usuario
    try {
      console.log(
        'Attempting Cloudinary search with expression:',
        `tags:user_${userId} AND tags:avatar`,
      );

      const result = await cloudinary.search
        .expression(`tags:user_${userId} AND tags:avatar`)
        .sort_by('created_at', 'desc')
        .max_results(1)
        .execute();

      console.log('Cloudinary search result:', result);

      if (result.resources && result.resources.length > 0) {
        const avatar = {
          public_id: result.resources[0].public_id,
          url: result.resources[0].secure_url,
        };
        console.log('Avatar found:', avatar);
        return NextResponse.json(avatar);
      }

      console.log('No avatar found for user:', userId);
      return NextResponse.json({ public_id: null, url: null });
    } catch (searchError) {
      console.error('Search API failed, trying alternative approach:', searchError);

      // Método alternativo: buscar en el folder de avatars
      try {
        const folderResult = await cloudinary.api.resources({
          type: 'upload',
          prefix: 'avatars/',
          tags: true,
          max_results: 100,
        });

        console.log('Folder search result:', folderResult);

        // Filtrar por tag user_${userId}
        const userAvatar = folderResult.resources.find(
          (resource: { tags?: string[]; public_id: string; secure_url: string }) =>
            resource.tags && resource.tags.includes(`user_${userId}`),
        );

        if (userAvatar) {
          const avatar = {
            public_id: userAvatar.public_id,
            url: userAvatar.secure_url,
          };
          console.log('Avatar found via folder search:', avatar);
          return NextResponse.json(avatar);
        }

        console.log('No avatar found in folder for user:', userId);
        return NextResponse.json({ public_id: null, url: null });
      } catch (folderError) {
        console.error('Folder search also failed:', folderError);
        throw folderError;
      }
    }
  } catch (error) {
    console.error('Error fetching user avatar:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
