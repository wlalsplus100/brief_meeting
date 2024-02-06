import React from 'react';
import styled from '@emotion/styled';

interface TSendButtonProps {
  onButton: boolean;
  setOnButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button = styled.button<{ onButton: boolean }>`
  all: unset;
  position: absolute;
  right: 4px;
  border-radius: 50%;
  padding: 4px;
  top: 10%;
  background-color: pink;
  width: 24px;
  height: 24px;
  display: ${({ onButton }) => (onButton ? 'inline-block' : 'none')};
`;

export const SendButton = ({ onButton, setOnButton }: TSendButtonProps) => {
  return (
    <Button onButton={onButton} role="button">
      <img src="/images/Paper_Plane.svg" alt="" width={24} height={24} />
    </Button>
  );
};
