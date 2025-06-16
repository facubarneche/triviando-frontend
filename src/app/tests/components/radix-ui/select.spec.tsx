import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/select';

describe('Select component', () => {
  it('renders SelectTrigger with placeholder', () => {
    render(
      <Select>
        <SelectTrigger>Choose an option</SelectTrigger>
      </Select>,
    );
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('renders SelectContent with items', () => {
    render(
      <Select open>
        <SelectTrigger>Open</SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
          <SelectItem value="two">Two</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('calls onValueChange when item is selected', () => {
    const handleChange = jest.fn();
    render(
      <Select onValueChange={handleChange} open>
        <SelectTrigger>Open</SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
          <SelectItem value="two">Two</SelectItem>
        </SelectContent>
      </Select>,
    );
    fireEvent.click(screen.getByText('One'));
    expect(handleChange).toHaveBeenCalledWith('one');
  });
});
