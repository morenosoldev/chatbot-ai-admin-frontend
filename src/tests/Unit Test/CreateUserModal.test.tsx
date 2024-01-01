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
      (axiosInstance.post as jest.Mock).mockResolvedValueOnce({});
      fireEvent.click(getByTestId('create-user-button'));
    });

    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/sign-up', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
