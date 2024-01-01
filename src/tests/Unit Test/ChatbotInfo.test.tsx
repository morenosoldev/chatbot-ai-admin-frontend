import { render, fireEvent } from '@testing-library/react';
import ChatbotInfo from '../../components/chatbot/info/ChatbotInfo';

jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

const users = [
  {
    _id: 'user1',
    name: 'User 1',
    createdAt: '2023-01-01',
    email: 'user1@example.com',
  },
  {
    _id: 'user2',
    name: 'User 2',
    createdAt: '2023-01-02',
    email: 'user2@example.com',
  },
];

describe('ChatbotInfo', () => {
  beforeAll(() => {
    Object.defineProperty(global, 'Image', {
      writable: true,
      value: class MockImage {
        _src: any;
        onload(): void {
          throw new Error('Method not implemented.');
        }
        set src(value: any) {
          this._src = value;
          setTimeout(() => this.onload());
        }
      },
    });
  });

  test('renders and interacts correctly', () => {
    const setName = jest.fn();
    const setMessage = jest.fn();
    const setUserId = jest.fn();
    const setSuggestedMessages = jest.fn();
    const setLogo = jest.fn();

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <ChatbotInfo
        name="Test Name"
        setName={setName}
        logo={null}
        setLogo={setLogo}
        message="Test Message"
        setMessage={setMessage}
        userId="user1"
        setUserId={setUserId}
        suggestedMessages={[]}
        setSuggestedMessages={setSuggestedMessages}
        users={users}
        getRootProps={() => ({})}
        getInputProps={() => ({})}
      />,
    );

    const nameInput = getByPlaceholderText('Chatbot navn');
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    expect(setName).toHaveBeenCalledWith('New Name');

    const messageInput = getByPlaceholderText('Enter a message');
    fireEvent.change(messageInput, { target: { value: 'New Message' } });
    expect(setMessage).toHaveBeenCalledWith('New Message');

    const userIdSelect = getByTestId('user-id-select');
    fireEvent.change(userIdSelect, { target: { value: 'user2' } });
    expect(setUserId).toHaveBeenCalledWith('user2');

    const suggestedMessagesInput = getByPlaceholderText(
      'Skriv foreslåede beskeder sepereret med kommaer',
    );
    fireEvent.change(suggestedMessagesInput, {
      target: { value: 'Message1, Message2' },
    });
    expect(setSuggestedMessages).toHaveBeenCalledWith(['Message1', 'Message2']);

    const correctImage = new File(['(⌐□_□)'], 'CorrectImage.png', {
      type: 'image/png',
    });
    Object.defineProperty(Image.prototype, 'width', { value: 799 });
    Object.defineProperty(Image.prototype, 'height', { value: 799 });

    const fileInput = getByText('Logo');
    fireEvent.change(fileInput, {
      target: {
        files: [correctImage],
      },
    });
  });
});
