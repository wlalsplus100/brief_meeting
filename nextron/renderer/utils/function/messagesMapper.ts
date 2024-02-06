import { Message } from '../types/types';
import { Chat } from '../../components/chat';

export const messageMapper = (content: Message[], opportunity: number) => {
  const mappedContent = content.map(item => {
    opportunity -= 1;
    console.log(item);
    return Chat(item);
  });
  return { mappedContent, remainingOpportunity: opportunity };
};
