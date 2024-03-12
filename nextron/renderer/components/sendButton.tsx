import React from 'react';
import styled from '@emotion/styled';

interface TSendButtonProps {
  button: boolean;
  setOnButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button = styled.button<{ button: boolean }>`
  all: unset;
  position: absolute;
  right: 4px;
  border-radius: 50%;
  padding: 4px;
  top: 10%;
  background-color: pink;
  width: 24px;
  height: 24px;
  display: ${({ button }) => (button ? 'inline-block' : 'none')};
  cursor: pointer;
`;

export const SendButton = ({ button, setOnButton }: TSendButtonProps) => {
  return (
    <Button
      button={button}
      role="button"
      onClick={() => {
        setOnButton(true);
      }}
    >
      <img src="/images/Paper_Plane.svg" alt="" width={24} height={24} />
    </Button>
  );
};
