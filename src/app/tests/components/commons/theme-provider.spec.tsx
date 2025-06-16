/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../../components/theme-provider';

// Mock next-themes ThemeProvider
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="next-themes-provider" {...props}>
      {children}
    </div>
  ),
}));

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <span>Test Child</span>
      </ThemeProvider>,
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('passes props to NextThemesProvider', () => {
    const { getByTestId } = render(
      <ThemeProvider attribute="class">
        <span>Child</span>
      </ThemeProvider>,
    );
    const provider = getByTestId('next-themes-provider');
    expect(provider.getAttribute('attribute')).toBe('class');
  });

  it('renders without children', () => {
    const { getByTestId } = render(<ThemeProvider />);
    expect(getByTestId('next-themes-provider')).toBeInTheDocument();
  });
});
