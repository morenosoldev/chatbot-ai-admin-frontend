import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUploads from '../../components/chatbot/files/FileUploads';

describe('FileUploads', () => {
  const defaultProps = {
    getRootProps: jest.fn(),
    getInputProps: jest.fn(),
    selectedFiles: [],
    handleSaveFile: jest.fn(),
    url: '',
    setUrl: jest.fn(),
    handleUrlSubmit: jest.fn(),
  };

  it('should render without errors', () => {
    const { container } = render(<FileUploads {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should display a file upload area', () => {
    const { getByText } = render(<FileUploads {...defaultProps} />);
    expect(getByText(/Drag 'n' drop some files here/i)).toBeInTheDocument();
  });

  it('should display selected file names', () => {
    const selectedFiles = [new File(['file content'], 'file.txt')];
    const { getByText } = render(
      <FileUploads {...defaultProps} selectedFiles={selectedFiles} />,
    );
    expect(getByText('file.txt')).toBeInTheDocument();
  });

  it('should call handleSaveFile when "Save File" button is clicked', () => {
    const { getByText } = render(
      <FileUploads
        {...defaultProps}
        selectedFiles={[new File(['file content'], 'file.txt')]}
      />,
    );
    const saveButton = getByText('Save File');
    fireEvent.click(saveButton);
    expect(defaultProps.handleSaveFile).toHaveBeenCalled();
  });

  it('should display an input for entering a URL', () => {
    const { getByPlaceholderText } = render(<FileUploads {...defaultProps} />);
    expect(getByPlaceholderText('Enter a URL')).toBeInTheDocument();
  });

  it('should call setUrl when URL input value is changed', () => {
    const { getByPlaceholderText } = render(<FileUploads {...defaultProps} />);
    const urlInput = getByPlaceholderText('Enter a URL');
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    expect(defaultProps.setUrl).toHaveBeenCalledWith('https://example.com');
  });

  it('should call handleUrlSubmit when "Submit URL" button is clicked', () => {
    const { getByText } = render(<FileUploads {...defaultProps} />);
    const submitButton = getByText('Submit URL');
    fireEvent.click(submitButton);
    expect(defaultProps.handleUrlSubmit).toHaveBeenCalled();
  });
});
