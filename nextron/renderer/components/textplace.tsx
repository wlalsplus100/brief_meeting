import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { keyboardInputDetector } from '../utils/function/keyboardInputDetector';
import { SendButton } from './sendButton';
import { sendMessage } from '../utils/function/sendMessage';
import { messageMapper } from '../utils/function/messagesMapper';

const Textarea = styled.textarea`
  box-sizing: border-box;
  border-top: black 1px solid;
  width: 100%;
  height: 90px;
  resize: none;
  padding: 1rem;
  outline: none;
`;

const Container = styled.div`
  position: relative;
`;

interface TextplaceT {
  setChats: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  opportunity: number;
  setOpportunity: React.Dispatch<React.SetStateAction<number>>;
  lastMessageRef: React.RefObject<HTMLDivElement>;
  myName: string;
  roomName: string;
}

export const Textplace = ({
  setChats,
  opportunity,
  setOpportunity,
  lastMessageRef,
  myName,
  roomName,
}: TextplaceT) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [button, setButton] = useState(false);
  const [sendflag, setSendflag] = useState(false);

  useEffect(() => {
    if (textareaRef.current && button && sendflag) {
      const { mappedContent, remainingOpportunity } = messageMapper(
        [{ message: textareaRef.current.value, sender: myName }],
        opportunity,
        lastMessageRef,
        myName,
      );
      setChats(prevChats => [...prevChats, mappedContent]);
      setOpportunity(remainingOpportunity);
      sendMessage(textareaRef.current.value, roomName);
      setButton(false);
      setSendflag(false);
      textareaRef.current.value = '';
    }
  }, [button, sendflag]);

  const handleKeyboardEvent: React.KeyboardEventHandler<HTMLDivElement> = event => {
    if (textareaRef.current?.value.trim() !== '') {
      setButton(true);
      if (keyboardInputDetector(event.nativeEvent) === 'Enter' && !event.shiftKey) {
        setSendflag(true);
      }
    } else {
      setButton(false);
    }
  };

  return (
    <Container onKeyUp={handleKeyboardEvent}>
      <Textarea ref={textareaRef}></Textarea>
      <SendButton button={button} setOnButton={setSendflag} />
    </Container>
  );
};
