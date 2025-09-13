import { useTopicCreationStore } from '@/app/stores/topicCreationStore';
import { act, renderHook } from '@testing-library/react';

// Mock console.warn for error handling tests
const originalConsoleWarn = console.warn;
const originalDateNow = Date.now;

describe('topicCreationStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTopicCreationStore.setState({
      creatingTopics: [],
      refreshCallback: null,
    });

    // Clear all timers and mocks
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore all mocks
    console.warn = originalConsoleWarn;
    Date.now = originalDateNow;
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  describe('Initial State', () => {
    it('has empty creatingTopics array initially', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      expect(result.current.creatingTopics).toEqual([]);
    });

    it('has null refreshCallback initially', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      expect(result.current.refreshCallback).toBeNull();
    });
  });

  describe('setCreating', () => {
    it('adds a new topic to creatingTopics', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('React Fundamentals');
      });

      expect(result.current.creatingTopics).toHaveLength(1);
      expect(result.current.creatingTopics[0].name).toBe('React Fundamentals');
      expect(result.current.creatingTopics[0].timestamp).toBeGreaterThan(0);
    });

    it('updates timestamp when adding existing topic name', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('JavaScript Basics');
      });

      const firstTimestamp = result.current.creatingTopics[0].timestamp;

      // Mock Date.now to ensure different timestamp
      const originalDateNow = Date.now;
      Date.now = jest.fn(() => firstTimestamp + 1000);

      act(() => {
        result.current.setCreating('JavaScript Basics');
      });

      expect(result.current.creatingTopics).toHaveLength(1);
      expect(result.current.creatingTopics[0].timestamp).toBeGreaterThan(firstTimestamp);

      // Restore original Date.now
      Date.now = originalDateNow;
    });

    it('adds multiple different topics', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Topic 1');
        result.current.setCreating('Topic 2');
        result.current.setCreating('Topic 3');
      });

      expect(result.current.creatingTopics).toHaveLength(3);
      expect(result.current.creatingTopics.map((t) => t.name)).toEqual([
        'Topic 1',
        'Topic 2',
        'Topic 3',
      ]);
    });

    it('does not duplicate topics with same name', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Duplicate Topic');
        result.current.setCreating('Other Topic');
        result.current.setCreating('Duplicate Topic');
      });

      expect(result.current.creatingTopics).toHaveLength(2);
      const topicNames = result.current.creatingTopics.map((t) => t.name);
      expect(topicNames).toContain('Duplicate Topic');
      expect(topicNames).toContain('Other Topic');
    });
  });

  describe('removeCreating', () => {
    it('removes a topic from creatingTopics', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Topic to Remove');
        result.current.setCreating('Topic to Keep');
      });

      expect(result.current.creatingTopics).toHaveLength(2);

      act(() => {
        result.current.removeCreating('Topic to Remove');
      });

      expect(result.current.creatingTopics).toHaveLength(1);
      expect(result.current.creatingTopics[0].name).toBe('Topic to Keep');
    });

    it('does nothing when removing non-existent topic', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Existing Topic');
      });

      const initialLength = result.current.creatingTopics.length;

      act(() => {
        result.current.removeCreating('Non-existent Topic');
      });

      expect(result.current.creatingTopics).toHaveLength(initialLength);
    });

    it('calls refreshCallback when removing a topic', () => {
      const mockRefreshCallback = jest.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setRefreshCallback(mockRefreshCallback);
        result.current.setCreating('Topic to Remove');
      });

      act(() => {
        result.current.removeCreating('Topic to Remove');
      });

      expect(mockRefreshCallback).toHaveBeenCalledTimes(1);
    });

    it('handles refreshCallback errors gracefully', async () => {
      const mockRefreshCallback = jest.fn().mockRejectedValue(new Error('Refresh failed'));
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setRefreshCallback(mockRefreshCallback);
        result.current.setCreating('Topic to Remove');
      });

      act(() => {
        result.current.removeCreating('Topic to Remove');
      });

      expect(mockRefreshCallback).toHaveBeenCalledTimes(1);

      // Wait for the promise to reject and the error handler to be called
      await new Promise((resolve) => {
        setTimeout(() => {
          expect(consoleSpy).toHaveBeenCalledWith(
            'Error en refresh automático del store:',
            expect.any(Error),
          );
          consoleSpy.mockRestore();
          resolve(undefined);
        }, 50);
      });
    });

    it('does not call refreshCallback when no callback is set', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Topic to Remove');
      });

      // This should not throw an error
      expect(() => {
        act(() => {
          result.current.removeCreating('Topic to Remove');
        });
      }).not.toThrow();
    });
  });

  describe('isCreating', () => {
    it('returns true for existing topic', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Existing Topic');
      });

      expect(result.current.isCreating('Existing Topic')).toBe(true);
    });

    it('returns false for non-existent topic', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      expect(result.current.isCreating('Non-existent Topic')).toBe(false);
    });

    it('returns false after topic is removed', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Temporary Topic');
      });

      expect(result.current.isCreating('Temporary Topic')).toBe(true);

      act(() => {
        result.current.removeCreating('Temporary Topic');
      });

      expect(result.current.isCreating('Temporary Topic')).toBe(false);
    });

    it('is case-sensitive', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Case Sensitive Topic');
      });

      expect(result.current.isCreating('Case Sensitive Topic')).toBe(true);
      expect(result.current.isCreating('case sensitive topic')).toBe(false);
      expect(result.current.isCreating('CASE SENSITIVE TOPIC')).toBe(false);
    });
  });

  describe('clearOldCreations', () => {
    it('removes topics older than 1 hour', () => {
      const { result } = renderHook(() => useTopicCreationStore());
      const now = 1640995200000; // Fixed timestamp: 2022-01-01 00:00:00
      const oneHourAgo = now - 60 * 60 * 1000;
      const twoHoursAgo = now - 2 * 60 * 60 * 1000;
      const thirtyMinutesAgo = now - 30 * 60 * 1000;

      // Mock Date.now to return fixed time
      Date.now = jest.fn(() => now);

      // Manually add topics with specific timestamps
      act(() => {
        useTopicCreationStore.setState({
          creatingTopics: [
            { name: 'Old Topic 1', timestamp: twoHoursAgo },
            { name: 'Old Topic 2', timestamp: oneHourAgo - 1000 }, // Just over 1 hour old
            { name: 'Recent Topic', timestamp: thirtyMinutesAgo }, // 30 minutes old
          ],
        });
      });

      expect(result.current.creatingTopics).toHaveLength(3);

      act(() => {
        result.current.clearOldCreations();
      });

      expect(result.current.creatingTopics).toHaveLength(1);
      expect(result.current.creatingTopics[0].name).toBe('Recent Topic');
    });

    it('keeps all topics when none are older than 1 hour', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('Recent Topic 1');
        result.current.setCreating('Recent Topic 2');
      });

      const initialLength = result.current.creatingTopics.length;

      act(() => {
        result.current.clearOldCreations();
      });

      expect(result.current.creatingTopics).toHaveLength(initialLength);
    });

    it('removes all topics when all are older than 1 hour', () => {
      const { result } = renderHook(() => useTopicCreationStore());
      const now = 1640995200000; // Fixed timestamp
      const twoHoursAgo = now - 2 * 60 * 60 * 1000;

      // Mock Date.now to return fixed time
      Date.now = jest.fn(() => now);

      // Manually add old topics
      act(() => {
        useTopicCreationStore.setState({
          creatingTopics: [
            { name: 'Old Topic 1', timestamp: twoHoursAgo },
            { name: 'Old Topic 2', timestamp: twoHoursAgo },
          ],
        });
      });

      expect(result.current.creatingTopics).toHaveLength(2);

      act(() => {
        result.current.clearOldCreations();
      });

      expect(result.current.creatingTopics).toHaveLength(0);
    });
  });

  describe('setRefreshCallback', () => {
    it('sets the refresh callback function', () => {
      const mockCallback = jest.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setRefreshCallback(mockCallback);
      });

      expect(result.current.refreshCallback).toBe(mockCallback);
    });

    it('overwrites existing callback', () => {
      const firstCallback = jest.fn().mockResolvedValue(undefined);
      const secondCallback = jest.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setRefreshCallback(firstCallback);
      });

      expect(result.current.refreshCallback).toBe(firstCallback);

      act(() => {
        result.current.setRefreshCallback(secondCallback);
      });

      expect(result.current.refreshCallback).toBe(secondCallback);
      expect(result.current.refreshCallback).not.toBe(firstCallback);
    });
  });

  describe('Integration Tests', () => {
    it('handles complete workflow: create, check, remove', () => {
      const { result } = renderHook(() => useTopicCreationStore());
      const topicName = 'Full Workflow Topic';

      // Initially not creating
      expect(result.current.isCreating(topicName)).toBe(false);

      // Start creating
      act(() => {
        result.current.setCreating(topicName);
      });

      expect(result.current.isCreating(topicName)).toBe(true);
      expect(result.current.creatingTopics).toHaveLength(1);

      // Finish creating
      act(() => {
        result.current.removeCreating(topicName);
      });

      expect(result.current.isCreating(topicName)).toBe(false);
      expect(result.current.creatingTopics).toHaveLength(0);
    });

    it('handles multiple topics simultaneously', () => {
      const { result } = renderHook(() => useTopicCreationStore());
      const topics = ['Topic A', 'Topic B', 'Topic C'];

      // Start creating all topics
      act(() => {
        topics.forEach((topic) => result.current.setCreating(topic));
      });

      // All should be creating
      topics.forEach((topic) => {
        expect(result.current.isCreating(topic)).toBe(true);
      });
      expect(result.current.creatingTopics).toHaveLength(3);

      // Remove middle topic
      act(() => {
        result.current.removeCreating('Topic B');
      });

      expect(result.current.isCreating('Topic A')).toBe(true);
      expect(result.current.isCreating('Topic B')).toBe(false);
      expect(result.current.isCreating('Topic C')).toBe(true);
      expect(result.current.creatingTopics).toHaveLength(2);

      // Clear old creations (assuming they're recent, should keep all)
      act(() => {
        result.current.clearOldCreations();
      });

      expect(result.current.creatingTopics).toHaveLength(2);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string topic names', () => {
      const { result } = renderHook(() => useTopicCreationStore());

      act(() => {
        result.current.setCreating('');
      });

      expect(result.current.isCreating('')).toBe(true);
      expect(result.current.creatingTopics).toHaveLength(1);

      act(() => {
        result.current.removeCreating('');
      });

      expect(result.current.isCreating('')).toBe(false);
      expect(result.current.creatingTopics).toHaveLength(0);
    });

    it('handles special characters in topic names', () => {
      const { result } = renderHook(() => useTopicCreationStore());
      const specialTopic = 'Topic with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';

      act(() => {
        result.current.setCreating(specialTopic);
      });

      expect(result.current.isCreating(specialTopic)).toBe(true);

      act(() => {
        result.current.removeCreating(specialTopic);
      });

      expect(result.current.isCreating(specialTopic)).toBe(false);
    });

    it('handles very long topic names', () => {
      const { result } = renderHook(() => useTopicCreationStore());
      const longTopic = 'A'.repeat(1000); // Very long topic name

      act(() => {
        result.current.setCreating(longTopic);
      });

      expect(result.current.isCreating(longTopic)).toBe(true);
      expect(result.current.creatingTopics[0].name).toBe(longTopic);
    });
  });
});
