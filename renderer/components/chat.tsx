import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface Tcontent {
  message: string;
  sender: string | boolean;
}

const containerStyle = css`
  padding: 8px;
  background-color: white;
  width: fit-content;
  color: black;
  border-radius: 1rem;
`;

const ChatBox = styled.div<{ isMyMessage?: boolean }>`
  color: white;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  margin: 16px;
  align-items: ${({ isMyMessage }) =>
    isMyMessage ? 'flex-end' : 'flex-start'};
`;

const MyChatContainer = styled.div`
  ${containerStyle}
`;

const HisChatContainer = styled.div`
  ${containerStyle}
`;

export const Chat = ({ message, sender }: Tcontent) => {
  if (typeof sender === 'string') {
    return (
      <ChatBox>
        {sender}
        <HisChatContainer>
          <span>{message}</span>
        </HisChatContainer>
      </ChatBox>
    );
  }
  return (
    <ChatBox isMyMessage>
      <MyChatContainer>{message}</MyChatContainer>
    </ChatBox>
  );
};
