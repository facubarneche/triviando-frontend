import axios from 'axios';

export type PlanLimitType = 'topics' | 'questions';

const MATCHERS: Record<PlanLimitType, string> = {
  topics: 'límite de tópicos diarios',
  questions: 'límite de preguntas diarias',
};

export const DEFAULT_LIMIT_MESSAGES: Record<PlanLimitType, string> = {
  topics:
    'Has alcanzado el límite diario de creación de tópicos con tu plan actual. Actualiza a Premium para seguir generando nuevas ideas sin restricciones.',
  questions:
    'Has alcanzado el límite diario de preguntas con tu plan actual. Da el siguiente paso y desbloquea la experiencia completa con Premium.',
};

export function isPlanLimitError(error: unknown, limitType: PlanLimitType): boolean {
  if (!axios.isAxiosError(error)) return false;
  const message = extractPlanLimitMessage(error);
  if (!message) return false;
  const matcher = MATCHERS[limitType];
  return message.toLowerCase().includes(matcher);
}

export function extractPlanLimitMessage(error: unknown): string | null {
  if (!axios.isAxiosError(error)) return null;
  const rawMessage =
    (error.response?.data?.error as string | undefined) ||
    (error.response?.data?.message as string | undefined) ||
    error.message;

  return typeof rawMessage === 'string' ? rawMessage : null;
}
