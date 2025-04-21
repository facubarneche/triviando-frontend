import { handleError } from "./errorHandler";

/**
 * Formatea una fecha en formato ISO (con o sin hora) al formato "Marzo 2023".
 * Devuelve una cadena vacía si la fecha es inválida.
 */
export function formatDateToMonthYear(isoDate: string): string {
  if (!isoDate) return '';

  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';

    const formatted = new Intl.DateTimeFormat('es-AR', {
      month: 'long',
      year: 'numeric',
    }).format(date);

    return formatted.charAt(0).toUpperCase() + formatted.slice(1).replace(' de ', ' ');
  } catch (error) {
    handleError(error);
    return '';
  }
}
