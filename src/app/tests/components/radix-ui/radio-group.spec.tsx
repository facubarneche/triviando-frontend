import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { fireEvent, render } from '@testing-library/react';

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="1" />
        <RadioGroupItem value="2" />
      </RadioGroup>,
    );
    expect(getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders the correct number of radio items', () => {
    const { getAllByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="1" />
        <RadioGroupItem value="2" />
        <RadioGroupItem value="3" />
      </RadioGroup>,
    );
    expect(getAllByRole('radio')).toHaveLength(3);
  });

  it('calls onValueChange when a radio item is selected', () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <RadioGroup onValueChange={handleChange}>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>,
    );
    fireEvent.click(getAllByRole('radio')[1]);
    expect(handleChange).toHaveBeenCalledWith('b');
  });

  it('applies disabled state to RadioGroupItem', () => {
    const { getByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="x" disabled />
      </RadioGroup>,
    );
    expect(getByRole('radio')).toBeDisabled();
  });

  it('applies custom className to RadioGroup', () => {
    const { getByRole } = render(
      <RadioGroup className="custom-class">
        <RadioGroupItem value="1" />
      </RadioGroup>,
    );
    expect(getByRole('radiogroup')).toHaveClass('custom-class');
  });

  it('applies custom className to RadioGroupItem', () => {
    const { getByRole } = render(
      <RadioGroup>
        <RadioGroupItem value="1" className="item-class" />
      </RadioGroup>,
    );
    expect(getByRole('radio')).toHaveClass('item-class');
  });
});
