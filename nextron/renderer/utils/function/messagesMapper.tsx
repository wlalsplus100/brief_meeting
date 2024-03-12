import { Message } from '../types/types';
import { Chat } from '../../components/chat';

export const messageMapper = (
  content: Message[],
  opportunity: number,
  lastMessageRef: React.RefObject<HTMLDivElement>,
  myName: string,
) => {
  const mappedContent = content.map((item, index) => {
    opportunity -= 1;
    return (
      <Chat
        message={item.message}
        sender={item.sender}
        lastMessageRef={lastMessageRef}
        myName={myName}
        key={index}
      />
    );
  });
  return { mappedContent, remainingOpportunity: opportunity };
};
