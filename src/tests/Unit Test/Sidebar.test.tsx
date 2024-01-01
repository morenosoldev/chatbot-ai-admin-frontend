import { render } from '@testing-library/react';
import Sidebar from '../../components/Sidebar';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';
import '@testing-library/jest-dom';

describe('Sidebar Component', () => {
  it('should render the Sidebar component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Sidebar sidebarOpen={true} setSidebarOpen={() => {}} />
        </BrowserRouter>
      </Provider>,
    );

    const dashboardLink = getByText('Dashboard');
    const chatbotsLink = getByText('Chatbots');
    const createLink = getByText('Opret chatbot');
    const usersLink = getByText('Brugere');
    const settingsLink = getByText('Indstillinger');

    expect(dashboardLink).toBeInTheDocument();
    expect(chatbotsLink).toBeInTheDocument();
    expect(createLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });
});
