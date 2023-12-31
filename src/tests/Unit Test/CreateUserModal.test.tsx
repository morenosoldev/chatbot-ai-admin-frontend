import { render, screen, fireEvent, act } from '@testing-library/react';
import axiosInstance from '../../axios/instance';
import CreateUserModal from '../../components/CreateUserModal';
import '@testing-library/jest-dom';

jest.mock('../../axios/instance', () => ({
  post: jest.fn(),
}));

describe('CreateUserModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal and submits form', async () => {
    const setShowModal = jest.fn();

    const { getByTestId } = render(
      <CreateUserModal showModal={true} setShowModal={setShowModal} />,
    );

    // Fill out form fields
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    await act(async () => {
      // Mock a successful form submission
      (axiosInstance.post as jest.Mock).mockResolvedValueOnce({});
      // Submit the form
      fireEvent.click(getByTestId('create-user-button'));
    });

    // Assert that the form data was sent to the server
    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/sign-up', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    // Assert that setShowModal was called to close the modal
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
