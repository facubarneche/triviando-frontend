import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreatingTopic {
  name: string;
  timestamp: number;
}

interface TopicCreationStore {
  creatingTopics: CreatingTopic[];
  setCreating: (name: string) => void;
  removeCreating: (name: string) => void;
  isCreating: (name: string) => boolean;
  clearOldCreations: () => void;
  refreshCallback: (() => Promise<void>) | null;
  setRefreshCallback: (callback: () => Promise<void>) => void;
}

export const useTopicCreationStore = create<TopicCreationStore>()(
  persist(
    (set, get) => ({
      creatingTopics: [],
      refreshCallback: null,

      setCreating: (name: string) => {
        set((state) => ({
          creatingTopics: [
            ...state.creatingTopics.filter((t) => t.name !== name),
            { name, timestamp: Date.now() },
          ],
        }));
      },

      removeCreating: (name: string) => {
        set((state) => ({
          creatingTopics: state.creatingTopics.filter((t) => t.name !== name),
        }));
        // Trigger refresh when a topic creation is completed
        // Solo si no estamos en medio de una operación de creación
        const { refreshCallback } = get();
        if (refreshCallback) {
          // Ejecutar el refresh de forma silenciosa para evitar errores duplicados
          refreshCallback().catch((error) => {
            console.warn('Error en refresh automático del store:', error);
          });
        }
      },

      isCreating: (name: string) => {
        return get().creatingTopics.some((t) => t.name === name);
      },

      clearOldCreations: () => {
        const oneHourAgo = Date.now() - 60 * 60 * 1000; // 1 hora
        set((state) => ({
          creatingTopics: state.creatingTopics.filter((t) => t.timestamp > oneHourAgo),
        }));
      },

      setRefreshCallback: (callback: () => Promise<void>) => {
        set({ refreshCallback: callback });
      },
    }),
    {
      name: 'topic-creation-storage',
    },
  ),
);
