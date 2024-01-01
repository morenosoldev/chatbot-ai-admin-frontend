import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Breadcrumb from '../../components/Breadcrumb';

describe('Breadcrumb Component', () => {
  it('should render the Breadcrumb component with the correct pageName', () => {
    const pageName = 'Sample Page';

    const { getByTestId } = render(
      <BrowserRouter>
        <Breadcrumb pageName={pageName} />
      </BrowserRouter>,
    );

    expect(getByTestId('breadcrumb-text')).toBeInTheDocument();

    expect(getByTestId('breadcrumb-text')).toHaveTextContent(pageName);
  });
});
