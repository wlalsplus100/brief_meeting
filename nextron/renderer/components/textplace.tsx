import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
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
}

export const Textplace = ({ setChats, opportunity, setOpportunity }: TextplaceT) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [onButton, setOnButton] = useState(false);

  const handleKeyboardEvent: React.KeyboardEventHandler<HTMLDivElement> = event => {
    if (textareaRef.current?.value !== '') {
      setOnButton(true);
      if (keyboardInputDetector(event.nativeEvent) === 'Enter' && textareaRef.current) {
        // 메세지를 보내는 함수 호출

        const { mappedContent, remainingOpportunity } = messageMapper(
          [{ message: textareaRef.current.value, sender: true }],
          opportunity,
        );
        setChats(prevChats => [...prevChats, mappedContent]);
        setOpportunity(remainingOpportunity);
        sendMessage(textareaRef.current.value);
        setOnButton(false);
        textareaRef.current.value = '';
      }
    } else {
      setOnButton(false);
    }
  };

  return (
    <Container onKeyUp={handleKeyboardEvent}>
      <Textarea ref={textareaRef}></Textarea>
      <SendButton onButton={onButton} setOnButton={setOnButton} />
    </Container>
  );
};
