import { render } from '@testing-library/react';
import FileBar from '../../components/chatbot/files/FileBar';
import '@testing-library/jest-dom';

describe('FileBar', () => {
  const defaultProps = {
    savedFiles: [
      new File(['file content'], 'file1.txt', { type: 'text/plain' }),
      new File(['file content'], 'file2.txt', { type: 'text/plain' }),
    ],
    savedUrls: ['https://example.com', 'https://example.org'],
  };

  it('should render without errors', () => {
    const { container } = render(<FileBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should display saved files with names and types', () => {
    const { getByText } = render(<FileBar {...defaultProps} />);
    expect(getByText('file1.txt Type: text/plain')).toBeInTheDocument();
    expect(getByText('file2.txt Type: text/plain')).toBeInTheDocument();
  });

  it('should display saved URLs', () => {
    const { getByText } = render(<FileBar {...defaultProps} />);
    expect(getByText('https://example.com')).toBeInTheDocument();
    expect(getByText('https://example.org')).toBeInTheDocument();
  });
});
