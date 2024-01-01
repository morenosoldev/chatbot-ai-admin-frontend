import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from '../../App';

// Create a mock Redux store with initialState
const mockStore = configureMockStore();
const initialState = {
  auth: {
    isLoggedIn: false, // Set the initial state as needed
  },
};
const store = mockStore(initialState);

describe('App Component', () => {
  it('renders the Sign In page when not logged in', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
    );

    // You can use queries to check if specific elements are rendered
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders the DefaultLayout when logged in', () => {
    // Update the initial state to simulate a logged-in user
    const loggedInState = {
      auth: {
        isLoggedIn: true,
      },
    };
    const loggedInStore = mockStore(loggedInState);

    render(
      <Provider store={loggedInStore}>
        <Router>
          <App />
        </Router>
      </Provider>,
    );

    // You can use queries to check if elements within the DefaultLayout are rendered
    expect(screen.getByText('Chatbots')).toBeInTheDocument();
    // Add more assertions for elements within the DefaultLayout as needed
  });

  // Add more test cases for other scenarios as needed
});
