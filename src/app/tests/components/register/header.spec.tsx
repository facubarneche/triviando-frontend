import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/app/(pages)/register/components/Header';

describe('Header', () => {
  it('displays the correct title', () => {
    render(<Header />);
    expect(screen.getByText('Crear una cuenta')).toBeInTheDocument();
  });

  it('displays the correct description', () => {
    render(<Header />);
    expect(
      screen.getByText('Únete a TrivIAndo y pon a prueba tus conocimientos'),
    ).toBeInTheDocument();
  });

  it('applies the correct classes to CardHeader', () => {
    const { container } = render(<Header />);
    const cardHeader = container.querySelector('.space-y-1.cursor-default');
    expect(cardHeader).toBeInTheDocument();
  });

  it('applies the correct classes to CardTitle', () => {
    const { container } = render(<Header />);
    const cardTitle = container.querySelector('.text-2xl.font-bold.text-center');
    expect(cardTitle).toBeInTheDocument();
  });

  it('applies the correct classes to CardDescription', () => {
    const { container } = render(<Header />);
    const cardDescription = container.querySelector('.text-center');
    expect(cardDescription).toBeInTheDocument();
  });
});
