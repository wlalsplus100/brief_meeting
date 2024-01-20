import styled from '@emotion/styled';
import React from 'react';

const Textarea = styled.textarea`
  box-sizing: border-box;
  border-top: black 1px solid;
  width: 100%;
  height: 90px;
  resize: none;
  padding: 1rem;
  outline: none;
`;

export const Textplace = () => {
  return <Textarea />;
};
