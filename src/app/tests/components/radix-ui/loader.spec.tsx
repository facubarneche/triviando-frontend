import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../../components/ui/loader';

describe('Loader', () => {
  it('renders with default props', () => {
    render(<Loader />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
    const progressRoot = screen.getByRole('progressbar', { hidden: true });
    expect(progressRoot).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<Loader label="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<Loader size={100} />);
    const progressRoot = screen.getByRole('progressbar', { hidden: true });
    expect(progressRoot).toHaveStyle({ width: '100px', height: '100px' });
  });

  it('applies correct styles to Progress.Indicator', () => {
    render(<Loader />);
    const indicator = screen.getByRole('progressbar', { hidden: true }).firstChild as HTMLElement;
    expect(indicator).toHaveStyle({
      background: 'conic-gradient(#6366f1 0% 60%, #e5e7eb 60% 100%)',
      animation: 'spin 1s linear infinite',
    });
  });

  it('renders the keyframes style tag', () => {
    render(<Loader />);
    const styleTag = document.querySelector('style');
    expect(styleTag?.textContent).toContain('@keyframes spin');
  });
});
