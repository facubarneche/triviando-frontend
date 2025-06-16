/* eslint-disable @typescript-eslint/no-explicit-any */
import Paginator, { PaginatorProps } from '@/app/components/paginator';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Create a shared pushMock
const pushMock = jest.fn();

// Mock next/navigation useRouter to always return the same pushMock
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

beforeEach(() => {
  pushMock.mockClear();
});

// Mock Button and icons
jest.mock('../../../components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <span>ChevronLeft</span>,
  ChevronRight: () => <span>ChevronRight</span>,
  ChevronsLeft: () => <span>ChevronsLeft</span>,
  ChevronsRight: () => <span>ChevronsRight</span>,
}));

describe('Paginator', () => {
  const setup = (props: Partial<PaginatorProps> = {}) => {
    const defaultProps: PaginatorProps = { totalPages: 5, number: 1 };
    return render(<Paginator {...defaultProps} {...props} />);
  };
  it('calls push with correct page when a page button is clicked', () => {
    const { getByText } = setup({ number: 1, totalPages: 5 });
    fireEvent.click(getByText('3'));
    expect(pushMock).toHaveBeenCalledWith('?page=3');
  });

  it('calls push with first page when "Primera página" is clicked', () => {
    const { getByLabelText } = setup({ number: 2, totalPages: 5 });
    fireEvent.click(getByLabelText('Primera página'));
    expect(pushMock).toHaveBeenCalledWith('?page=1');
  });

  it('calls push with last page when "Última página" is clicked', () => {
    const { getByLabelText } = setup({ number: 2, totalPages: 5 });
    fireEvent.click(getByLabelText('Última página'));
    expect(pushMock).toHaveBeenCalledWith('?page=5');
  });

  it('does not call push if page is out of bounds (less than 1)', () => {
    const { getByLabelText } = setup({ number: 0, totalPages: 5 });
    fireEvent.click(getByLabelText('Página anterior'));
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('does not call push if page is out of bounds (greater than totalPages)', () => {
    const { getByLabelText } = setup({ number: 4, totalPages: 5 });
    fireEvent.click(getByLabelText('Página siguiente'));
    expect(pushMock).not.toHaveBeenCalled();
  });
  it('renders page buttons and navigation controls', () => {
    const { getByLabelText, getByText } = setup();
    expect(getByLabelText('Primera página')).toBeInTheDocument();
    expect(getByLabelText('Página anterior')).toBeInTheDocument();
    expect(getByLabelText('Página siguiente')).toBeInTheDocument();
    expect(getByLabelText('Última página')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });

  it('disables previous/first buttons on first page', () => {
    const { getByLabelText } = setup({ number: 0 });
    expect(getByLabelText('Primera página')).toBeDisabled();
    expect(getByLabelText('Página anterior')).toBeDisabled();
  });

  it('disables next/last buttons on last page', () => {
    const { getByLabelText } = setup({ number: 4, totalPages: 5 });
    expect(getByLabelText('Página siguiente')).toBeDisabled();
    expect(getByLabelText('Última página')).toBeDisabled();
  });

  it('shows correct page buttons for middle page', () => {
    const { getByText } = setup({ number: 2, totalPages: 5 });
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
  });

  it('shows only available pages when totalPages < 3', () => {
    const { getByText, queryByText } = setup({ number: 0, totalPages: 2 });
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(queryByText('3')).toBeNull();
  });

  it('updates current page when number prop changes', () => {
    const { rerender, getByText } = render(<Paginator totalPages={5} number={0} />);
    expect(getByText('1')).toHaveClass('bg-purple-200 border-2 border-purple-600 text-purple-800');
    rerender(<Paginator totalPages={5} number={2} />);
    expect(getByText('3')).toHaveClass('bg-purple-200 border-2 border-purple-600 text-purple-800');
  });

  it('does not call push if clicking disabled navigation', () => {
    const { getByLabelText } = setup({ number: 0 });
    fireEvent.click(getByLabelText('Primera página'));
    expect(useRouter().push).not.toHaveBeenCalled();
  });
});
