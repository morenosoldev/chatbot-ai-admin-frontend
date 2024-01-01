import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DropdownUser from '../../components/DropdownUser';

const mockStore = configureStore([]);

describe('DropdownUser Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          name: 'Test User',
          image: 'https://example.com/test.png',
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DropdownUser />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('renders the user name and image', () => {
    const userName = screen.getByText('Test User');
    const userImage = screen.getByAltText('User');

    expect(userName).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
  });

  it('opens the dropdown when the user clicks the link', () => {
    const dropdownButton = screen.getByTestId('dropdown-button');

    fireEvent.click(dropdownButton);

    const settingsLink = screen.getByTestId('settings-link');

    expect(settingsLink).toBeInTheDocument();
  });

  it('closes the dropdown when the user clicks outside', () => {
    const dropdownButton = screen.getByTestId('dropdown-button');

    fireEvent.click(dropdownButton);

    const settingsLink = screen.getByTestId('settings-link');
    expect(settingsLink).toBeInTheDocument();

    fireEvent.click(document.body);

    const dropdown = screen.getByTestId('dropdown-menu');
    expect(dropdown).toHaveClass('hidden');
  });

  it('closes the dropdown when the user presses the escape key', () => {
    const dropdownButton = screen.getByTestId('dropdown-button');
    const dropdownMenu = screen.getByTestId('dropdown-menu');

    fireEvent.click(dropdownButton);

    expect(dropdownMenu).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });

    const dropdown = screen.getByTestId('dropdown-menu');
    expect(dropdown).toHaveClass('hidden');
  });
});
