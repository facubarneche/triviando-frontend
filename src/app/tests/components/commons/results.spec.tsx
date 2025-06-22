import { render, screen } from '@testing-library/react';
import Results from '@/app/(pages)/[username]/results/page';

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: (key: string) => (key === 'score' ? '4' : '5') }),
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('canvas-confetti', () => jest.fn());

jest.mock('@/app/(pages)/results/utils/percentage', () => ({
  getColorAndMessage: jest.fn(() => ({ color: 'green', message: '¡Bien hecho!' })),
}));

describe('Results', () => {
  it('renderiza los resultados y el mensaje', () => {
    render(<Results />);
    expect(screen.getByText(/Resultados del Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/¡Bien hecho!/i)).toBeInTheDocument();
    expect(screen.getByText(/Tu puntuación/i)).toBeInTheDocument();
    expect(screen.getByText(/Obtuviste/i)).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
    expect(screen.getByText(/80%/i)).toBeInTheDocument();
  });
});
