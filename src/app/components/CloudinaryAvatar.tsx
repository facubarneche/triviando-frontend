'use client';

import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { cn } from '@/app/utils/utils';
import { getAvatarInitials } from '@/app/utils/avatarUtils';

interface CloudinaryAvatarProps {
  publicId?: string;
  fallbackText: string;
  className?: string;
  size?: number;
  alt?: string;
}

export function CloudinaryAvatar({
  publicId,
  fallbackText,
  className,
  size = 96,
  alt = 'Avatar',
}: CloudinaryAvatarProps) {
  const initials = getAvatarInitials(fallbackText);

  return (
    <Avatar className={cn('border-4 border-cyan-200', className)}>
      {publicId ? (
        <CldImage
          src={publicId}
          alt={alt}
          width={size}
          height={size}
          crop="fill"
          gravity="face"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <AvatarFallback className="text-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white">
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
