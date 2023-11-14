import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ChatbotDemo from '../components/chatbot/single/ChatbotDemo';

export default function Chatbot() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Breadcrumb pageName="Chatbots" />
      {id ? <ChatbotDemo id={id} /> : <p>No ID found.</p>}
    </>
  );
}
