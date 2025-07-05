import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * GET /api/user/avatar?userId=123
 * Busca el avatar de un usuario en Cloudinary usando el user_id en los metadatos
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Buscar recursos en Cloudinary usando el tag del usuario
    try {
      const result = await cloudinary.search
        .expression(`tags:user_${userId} AND tags:avatar`)
        .sort_by('created_at', 'desc')
        .max_results(1)
        .execute();

      if (result.resources && result.resources.length > 0) {
        const avatar = {
          public_id: result.resources[0].public_id,
          url: result.resources[0].secure_url,
        };
        return NextResponse.json(avatar);
      }

      return NextResponse.json({ public_id: null, url: null });
    } catch {
      // Método alternativo: buscar en el folder de avatars
      try {
        const folderResult = await cloudinary.api.resources({
          type: 'upload',
          prefix: 'avatars/',
          tags: true,
          max_results: 100,
        });

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
          return NextResponse.json(avatar);
        }

        return NextResponse.json({ public_id: null, url: null });
      } catch {
        throw new Error('Avatar search failed');
      }
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
