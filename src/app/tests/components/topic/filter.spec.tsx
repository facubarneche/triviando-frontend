import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '@/app/(pages)/[username]/topics/components/Filter';

describe('Filter component', () => {
  const setup = (searchTerm = '') => {
    const setSearchTerm = jest.fn();
    render(<Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />);
    return { setSearchTerm };
  };

  it('renders input with placeholder', () => {
    setup();
    expect(screen.getByPlaceholderText('Buscar temas...')).toBeInTheDocument();
  });

  it('shows the current searchTerm value', () => {
    setup('test value');
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls setSearchTerm on input change', () => {
    const { setSearchTerm } = setup();
    const input = screen.getByPlaceholderText('Buscar temas...');
    fireEvent.change(input, { target: { value: 'nuevo tema' } });
    expect(setSearchTerm).toHaveBeenCalledWith('nuevo tema');
  });
});
