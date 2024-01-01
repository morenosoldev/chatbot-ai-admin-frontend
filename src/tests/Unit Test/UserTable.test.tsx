import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserTable from '../../components/UserTable';
import axiosInstance from '../../axios/instance';
import moment from 'moment';

jest.mock('../../axios/instance', () => ({
  get: jest.fn(),
}));

describe('UserTable', () => {
  test('renders user data when API call is successful', async () => {
    // Mock the API call
    const users = [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2021-01-01T00:00:00Z',
      },
    ];
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: { data: users },
    });

    render(<UserTable />);

    await waitFor(() => {
      users.forEach((user) => {
        expect(screen.getByText(user._id)).toBeInTheDocument();
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(
          screen.getByText(moment(user.createdAt).format('DD MMMM YYYY')),
        ).toBeInTheDocument();
      });
    });
  });

  test('displays a message when no users are found', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { data: [] } });

    render(<UserTable />);

    await waitFor(() => {
      expect(screen.getByText('Ikke nogle brugere fundet')).toBeInTheDocument();
    });
  });

  test('handles errors during API call', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue(new Error('API Error'));

    render(<UserTable />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching users')).toBeInTheDocument();
    });
  });
});
