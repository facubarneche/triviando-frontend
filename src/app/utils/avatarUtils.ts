/**
 * Generates initials from a full name or username for avatar fallback
 * @param name - Full name or username
 * @returns Initials (max 2 characters)
 */
export function getAvatarInitials(name: string): string {
  if (!name) return 'U';

  const words = name.trim().split(' ');

  if (words.length === 1) {
    // Single word (username), take first character
    return words[0].charAt(0).toUpperCase();
  }

  // Multiple words (full name), take first character of first two words
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

/**
 * Gets the avatar URL from Cloudinary public_id or returns undefined for fallback
 * @param publicId - Cloudinary public_id
 * @returns Cloudinary URL or undefined
 */
export function getAvatarUrl(publicId?: string): string | undefined {
  if (!publicId) return undefined;

  // The CldImage component will handle the URL generation
  // This is just for reference if needed elsewhere
  return publicId;
}
