import React from 'react';
import styled from 'styled-components';

type Props = {
  valueTitle: string;
  description: string;
  content: React.ReactNode;
};

const ArtworkValueLayout = ({ valueTitle, description, content }: Props) => {
  return (
    <Container>
      <Title>{valueTitle}</Title>
      <Description>{description}</Description>
      <ContentWrapper>
        <Content>{content}</Content>
      </ContentWrapper>
    </Container>
  );
};

export default ArtworkValueLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
  width: 19rem;
  height: fit-content;
  white-space: pre-line;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const Title = styled.div`
  background-color: #525252a0;
  padding: 0.7rem;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  font-family: 'pretendard-semibold';
  font-size: 0.86rem;
  margin-bottom: 10px;
  color: #ffffff;
`;
const Description = styled.div`
  font-family: 'pretendard-regular';
  width: 100%;
  font-size: 0.7rem;
  color: #595959;
  margin-bottom: 0.5rem;
  line-height: 120%;
`;
const Content = styled.div``;
