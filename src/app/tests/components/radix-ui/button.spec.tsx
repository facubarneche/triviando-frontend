import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../../../components/ui/button';

describe('Button', () => {
  it('renders children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    const { getByRole } = render(<Button>Default</Button>);
    const btn = getByRole('button');
    expect(btn.className).toContain('from-teal-500');
    expect(btn.className).toContain('h-10');
  });

  it('applies destructive variant', () => {
    const { getByRole } = render(<Button variant="destructive">Danger</Button>);
    expect(getByRole('button').className).toContain('from-red-500');
  });

  it('applies outline variant', () => {
    const { getByRole } = render(<Button variant="outline">Outline</Button>);
    expect(getByRole('button').className).toContain('border-teal-500');
  });

  it('applies secondary variant', () => {
    const { getByRole } = render(<Button variant="secondary">Secondary</Button>);
    expect(getByRole('button').className).toContain('bg-white/90');
  });

  it('applies ghost variant', () => {
    const { getByRole } = render(<Button variant="ghost">Ghost</Button>);
    expect(getByRole('button').className).toContain('hover:bg-white/20');
  });

  it('applies link variant', () => {
    const { getByRole } = render(<Button variant="link">Link</Button>);
    expect(getByRole('button').className).toContain('underline-offset-4');
  });

  it('applies size sm', () => {
    const { getByRole } = render(<Button size="sm">Small</Button>);
    expect(getByRole('button').className).toContain('h-8');
  });

  it('applies size lg', () => {
    const { getByRole } = render(<Button size="lg">Large</Button>);
    expect(getByRole('button').className).toContain('h-12');
  });

  it('applies size icon', () => {
    const { getByRole } = render(<Button size="icon" aria-label="icon" />);
    expect(getByRole('button').className).toContain('w-10');
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Button className="custom-class">Custom</Button>);
    expect(getByRole('button').className).toContain('custom-class');
  });

  it('is disabled when disabled prop is set', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    expect(getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('forwards props to underlying element', () => {
    const { getByRole } = render(
      <Button type="submit" aria-label="submit-btn">
        Submit
      </Button>,
    );
    const btn = getByRole('button');
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveAttribute('aria-label', 'submit-btn');
  });
});
