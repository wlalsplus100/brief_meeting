import styled from '@emotion/styled';
import { css } from '@emotion/react';
import React from 'react';

interface Tcontent {
  message: string;
  sender: string;
  lastMessageRef: React.RefObject<HTMLDivElement>;
  myName: string;
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
  gap: 4px;
  margin: 16px;
  align-items: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};

  & > span {
    padding-left: 8px;
  }
`;

const MyChatContainer = styled.div`
  ${containerStyle}
  background-color: pink;
`;

const HisChatContainer = styled.div`
  ${containerStyle}
`;

export const Chat = ({ message, sender, lastMessageRef, myName }: Tcontent) => {
  if (sender !== myName) {
    return (
      <ChatBox ref={lastMessageRef}>
        <span>{sender}</span>
        <HisChatContainer>
          <span>{message}</span>
        </HisChatContainer>
      </ChatBox>
    );
  }
  return (
    <ChatBox isMyMessage>
      <span>{sender}</span>
      <MyChatContainer>{message}</MyChatContainer>
    </ChatBox>
  );
};
