import { render, screen } from '@testing-library/react';
import Logo from '@/app/components/logo';

describe('Logo', () => {
  it('renderiza el logo con el tamaño por defecto', () => {
    render(<Logo />);
    expect(screen.getByText(/triv/i)).toBeInTheDocument();
    expect(screen.getByText(/IA/i)).toBeInTheDocument();
    expect(screen.getByText(/ndo/i)).toBeInTheDocument();
  });

  it('renderiza el logo con tamaño grande', () => {
    render(<Logo size="xl" />);
    expect(screen.getByText(/triv/i)).toBeInTheDocument();
    expect(screen.getByText(/IA/i)).toBeInTheDocument();
    expect(screen.getByText(/ndo/i)).toBeInTheDocument();
  });

  it('renderiza el logo animado', () => {
    render(<Logo animated={true} />);
    expect(screen.getByText(/IA/i)).toBeInTheDocument();
  });

  it('renderiza el logo sin animación', () => {
    render(<Logo animated={false} />);
    expect(screen.getByText(/IA/i)).toBeInTheDocument();
  });

  it('no muestra tagline si showTagline es false', () => {
    render(<Logo showTagline={false} />);
    expect(screen.queryByText(/trivIAndo/i)).not.toBeInTheDocument();
  });
});
