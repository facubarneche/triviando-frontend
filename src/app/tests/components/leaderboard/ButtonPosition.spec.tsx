// ButtonPosition.spec.tsx
import ButtonPosition from '@/app/(pages)/[username]/leaderboard/components/ButtonPosition';
import { render, screen, fireEvent } from '@testing-library/react';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('ButtonPosition', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('renders the button and calls push on click', () => {
    render(<ButtonPosition />);
    const button = screen.getByRole('button', { name: /mi posición/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith('?');
  });
});
