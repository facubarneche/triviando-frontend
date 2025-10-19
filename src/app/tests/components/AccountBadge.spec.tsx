import { render, screen } from '@testing-library/react';
import AccountBadge from '@/app/components/AccountBadge';
import '@testing-library/jest-dom';

describe('AccountBadge', () => {
  it('should render FREE account badge correctly', () => {
    render(<AccountBadge account="FREE" />);

    const badge = screen.getByText('Free');
    expect(badge).toBeInTheDocument();
  });

  it('should render PREMIUM account badge correctly', () => {
    render(<AccountBadge account="PREMIUM" />);

    const badge = screen.getByText('Premium');
    expect(badge).toBeInTheDocument();
  });

  it('should render without icon when showIcon is false', () => {
    render(<AccountBadge account="PREMIUM" showIcon={false} />);

    const badge = screen.getByText('Premium');
    expect(badge).toBeInTheDocument();
  });

  it('should render with icon by default', () => {
    render(<AccountBadge account="PREMIUM" />);

    const badge = screen.getByText('Premium');
    expect(badge).toBeInTheDocument();
  });
});
