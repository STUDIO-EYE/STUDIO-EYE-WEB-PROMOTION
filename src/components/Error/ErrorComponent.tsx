import { ERROR_MESSAGES } from "@/constants/ppErrorMessage";
import { theme } from "@/styles/theme";
import { AxiosError } from "axios";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

interface ErrorMessageProps {
  error: AxiosError | null;
  onClose: () => void; // 모달 닫기 콜백
}

const getErrorMessage = (error: AxiosError | null): string => {
  if (error?.message === "Network Error") {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  if (error?.response) {
    switch (error?.response.status) {
      case 400:
        return ERROR_MESSAGES.BAD_REQUEST;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return ERROR_MESSAGES.DEFAULT_ERROR;
    }
  }
  return ERROR_MESSAGES.DEFAULT_ERROR;
};

const ErrorComponent:React.FC<ErrorMessageProps>=({error, onClose})=> {
  const [isExiting, setIsExiting] = useState(false);
  const message = getErrorMessage(error);
  if (!error||error===null) return null;

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // 애니메이션 지속 시간과 동일
  };

  return (
  <ModalOverlay>
    <ModalContainer isExiting={isExiting}>
      <h2 style={{ color: theme.color.yellow.bold, marginBottom: "16px" }}>Error</h2>
      <p>{message}</p>
      <CloseButton onClick={handleClose}>닫기</CloseButton>
    </ModalContainer>
  </ModalOverlay>
);};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div<{ isExiting: boolean }>`
  background-color: #454545;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;

  animation: ${(props) => (props.isExiting ? fadeOut : fadeIn)} 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: ${theme.color.yellow.bold};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ffba59;
  }

  &:focus {
    outline: none;
  }
`;

export default ErrorComponent;