import styled from '@emotion/styled';
import React from 'react';

interface TheaderProps {
  opportunity: number;
}

const MenuContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: white;
`;

const OpportunityLeft = styled.div<TheaderProps>`
  position: absolute;
  padding: 1rem;
  left: 0%;
  font-size: x-large;
  color: ${({ opportunity }) => {
    if (opportunity === 1) {
      return 'red';
    } else if (opportunity <= 5) {
      return 'yellow';
    } else {
      return 'inherit';
    }
  }};
`;

const Logo = styled.div`
  & > img {
    height: 100%;
  }
`;

const SeeMore = styled.div`
  position: absolute;
  padding: 1rem;
  right: 0%;
`;

export const Header = ({ opportunity }: TheaderProps) => {
  return (
    <>
      <MenuContainer>
        <OpportunityLeft opportunity={opportunity}>
          {opportunity}
        </OpportunityLeft>
        <Logo>
          <img src="/images/logo.svg" alt="Logo" />
        </Logo>
        <SeeMore>
          <img src="/images/More_Vertical.svg" alt="See More"></img>
        </SeeMore>
      </MenuContainer>
    </>
  );
};
