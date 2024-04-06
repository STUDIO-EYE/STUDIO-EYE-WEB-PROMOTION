import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ModalBack = styled.div`
  background: rgba(43, 43, 43, 0.7);
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;
const Container = styled.div`
  width: 22rem;
  height: 15rem;
  background-color: #f3f4f8;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Content = styled.div`
  font-size: 33px;
  padding-bottom: 50px;
`;
const CloseModalButton = styled.button`
  position: absolute;
  height: 2.5rem;
  width: 12rem;
  bottom: 60px;
  background-color: rgb(255, 169, 0, 0.8);
  border-radius: 20px;
  /* border-color : black; */
  border: none;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: rgb(255, 169, 0, 1);
    color: black;
    border: black;
  }
`;

interface IModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const Modal = ({ isModalOpen, closeModal }: IModalProps) => {
  return (
    <>
      {isModalOpen && (
        <ModalBack>
          <Container>
            <Content>문의가 완료되었습니다. </Content>
            <CloseModalButton onClick={closeModal}>닫기</CloseModalButton>{" "}
          </Container>
        </ModalBack>
      )}
    </>
  );
};

export default Modal;
