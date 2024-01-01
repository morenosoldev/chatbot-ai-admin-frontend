import { render, fireEvent } from '@testing-library/react';
import DarkModeSwitcher from '../../components/DarkModeSwitcher';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useColorMode', () => {
  return jest.fn(() => ['light', () => {}]);
});

describe('DarkModeSwitcher Component', () => {
  it('should render the component with light mode initially', () => {
    const { getByLabelText } = render(<DarkModeSwitcher />);
    const switchInput = getByLabelText('Dark Mode Switch') as HTMLInputElement;

    expect(switchInput).toBeInTheDocument();
    expect(switchInput.checked).toBe(false);
  });

  it('should toggle to dark mode when clicked', () => {
    const { getByLabelText } = render(<DarkModeSwitcher />);
    const switchInput = getByLabelText('Dark Mode Switch') as HTMLInputElement;

    fireEvent.click(switchInput);

    expect(switchInput.checked).toBe(true);
  });

  it('should toggle back to light mode when clicked again', () => {
    const { getByLabelText } = render(<DarkModeSwitcher />);
    const switchInput = getByLabelText('Dark Mode Switch') as HTMLInputElement;

    fireEvent.click(switchInput);
    fireEvent.click(switchInput);

    expect(switchInput.checked).toBe(false);
  });
});
