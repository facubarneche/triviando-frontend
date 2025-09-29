/**
 * Authentication Utilities - Client-Side Only
 * Este archivo solo exporta hooks para Client Components
 * 
 * Para Server Components, importa directamente:
 * import { getUserIdSSR } from '@/app/utils/auth/getUserIdSSR'
 */

// Client-Side Authentication (CSR) - Safe for "use client"
export {
  useCurrentUserId,
  useCurrentUser,
  useUserProperty,
  useCurrentUsername,
  useIsAuthenticated,
} from './useCurrentUser';
