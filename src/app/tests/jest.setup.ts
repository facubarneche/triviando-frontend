import '@testing-library/jest-dom';

// Mock del useRouter de Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
