import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateTopicModal from '@/app/(pages)/[username]/topics/components/NewTopicModal';

describe('CreateTopicModal', () => {
  const onClose = jest.fn();
  const onCreateTopic = jest.fn();

  const setup = (props = {}) =>
    render(
      <CreateTopicModal isOpen={true} onClose={onClose} onCreateTopic={onCreateTopic} {...props} />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with all fields', () => {
    setup();
    expect(screen.getByText('Crear Nuevo Tema')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre del tema')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Crear Tema')).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', () => {
    setup();
    fireEvent.click(screen.getByText('Crear Tema'));
    expect(screen.getByText('El nombre del tema es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('La descripción del tema es obligatoria')).toBeInTheDocument();
    expect(onCreateTopic).not.toHaveBeenCalled();
  });

  it('clears errors when typing in fields', () => {
    setup();
    fireEvent.click(screen.getByText('Crear Tema'));
    const nameInput = screen.getByLabelText('Nombre del tema');
    fireEvent.change(nameInput, { target: { value: 'Matemáticas' } });
    expect(screen.queryByText('El nombre del tema es obligatorio')).not.toBeInTheDocument();
  });

  it('calls onCreateTopic and onClose with valid input', () => {
    setup();
    fireEvent.change(screen.getByLabelText('Nombre del tema'), { target: { value: 'Historia' } });
    fireEvent.change(screen.getByLabelText(/Contexto para la IA/), {
      target: { value: 'Preguntas sobre historia mundial.' },
    });
    fireEvent.click(screen.getByText('Crear Tema'));
    expect(onCreateTopic).toHaveBeenCalledWith({
      name: 'Historia',
      context: 'Preguntas sobre historia mundial.',
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Cancelar is clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Cancelar'));
    expect(onClose).toHaveBeenCalled();
  });
});
