import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatPreview from '../../components/ChatPreview';

describe('ChatPreview', () => {
  const defaultProps = {
    logo: 'logo.png',
    messages: [
      { message: 'Hello', isBot: true },
      { message: 'Hi', isBot: false },
    ],
    userMessageColor: '#FFFFFF',
    botMessageColor: '#000000',
    userTextColor: '#FFFFFF',
    botTextColor: '#000000',
  };

  it('should render without errors', () => {
    const { container } = render(<ChatPreview {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render the logo when provided', () => {
    const { getByAltText } = render(<ChatPreview {...defaultProps} />);
    const logoImage = getByAltText('Picture of the author');
    expect(logoImage).toBeInTheDocument();
  });

  it('should render the default logo when not provided', () => {
    const { getByAltText } = render(
      <ChatPreview {...defaultProps} logo={null} />,
    );
    const defaultLogoImage = getByAltText('Picture of the author');
    expect(defaultLogoImage).toBeInTheDocument();
  });

  it('should render bot messages with correct styles', () => {
    const { getByText } = render(<ChatPreview {...defaultProps} />);
    const botMessage = getByText('Hello');
    expect(botMessage).toHaveStyle('background-color: #000000');
    expect(botMessage).toHaveStyle('color: #000000');
  });

  it('should render user messages with correct styles', () => {
    const { getByText } = render(<ChatPreview {...defaultProps} />);
    const userMessage = getByText('Hi');
    expect(userMessage).toHaveStyle('background-color: #FFFFFF');
    expect(userMessage).toHaveStyle('color: #FFFFFF');
  });
});
