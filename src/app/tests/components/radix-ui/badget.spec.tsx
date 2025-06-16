import React from 'react';
import { render } from '@testing-library/react';
import { Badge, badgeVariants } from '@/app/components/ui/badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Badge>Test Badge</Badge>);
    expect(getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass(...badgeVariants({ variant: 'default' }).split(' '));
  });

  it('applies secondary variant styles', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(container.firstChild).toHaveClass(...badgeVariants({ variant: 'secondary' }).split(' '));
  });

  it('applies destructive variant styles', () => {
    const { container } = render(<Badge variant="destructive">Destructive</Badge>);
    expect(container.firstChild).toHaveClass(
      ...badgeVariants({ variant: 'destructive' }).split(' '),
    );
  });

  it('applies outline variant styles', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    expect(container.firstChild).toHaveClass(...badgeVariants({ variant: 'outline' }).split(' '));
  });

  it('merges custom className', () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('spreads additional props', () => {
    const { getByTestId } = render(<Badge data-testid="badge-test">With Props</Badge>);
    expect(getByTestId('badge-test')).toBeInTheDocument();
  });
});
