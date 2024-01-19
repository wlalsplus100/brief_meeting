import styled from '@emotion/styled';
import Image from 'next/image';

interface TheaderProps {
  opportunity: number;
}

const MenuContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  color: white;
`;

const OpportunityLeft = styled.div``;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  & > img {
    height: 100%;
  }
`;

const SeeMore = styled.div``;

export const Header = ({ opportunity }: TheaderProps) => {
  return (
    <>
      <MenuContainer>
        <OpportunityLeft>남은 기회 : {opportunity}</OpportunityLeft>
        <Logo>
          <img src="/images/logo.svg" />
        </Logo>
        <SeeMore>더보기</SeeMore>
      </MenuContainer>
    </>
  );
};
