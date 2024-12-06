import React from 'react';
import styled from 'styled-components';

const Modal = ({ src, closeModal }: { src: string; closeModal: () => void }) => {
  return (
    <Container>
      <ModalContent>
        <img src={src} alt='확대 이미지' />
      </ModalContent>
      <CloseButton onClick={closeModal}>닫기</CloseButton>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  padding: 1rem;
  height: auto;
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ModalContent = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
  }
`;

const CloseButton = styled.div`
  font-size: 0.8rem;
  cursor: pointer;
  width: fit-content;
  font-family: 'pretendard-semibold';
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
  margin-left: auto;
  &:hover {
    background-color: #5a6268;
  }
`;
