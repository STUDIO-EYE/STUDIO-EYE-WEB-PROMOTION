import React from 'react';
import slogan from '@/assets/images/PP/sloganImg.png';
import styled from 'styled-components';

type Props = {
  email: string;
  setEmail: (email: string) => void;
  pwd: string;
  setPwd: (pwd: string) => void;
  handleLogin: () => void;
};

const Login = ({ email, setEmail, pwd, setPwd, handleLogin }: Props) => {
  const isFormValid = email.length > 0 && pwd.length > 0;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      handleLogin();
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <SloganImg src={slogan} alt='slogan img' />
      <InputWrapper>
        <h1>아이디</h1>
        <input
          data-cy='id'
          required
          type='email'
          placeholder='yourmail@domain.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <h1>비밀번호</h1>
        <input
          data-cy='pw'
          required
          type='password'
          placeholder='enter password'
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </InputWrapper>
      <LoginBtnWrapper type='submit' disabled={!isFormValid}>
        <h1>로그인</h1>
      </LoginBtnWrapper>
    </Container>
  );
};

export default Login;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  width: 613px;
  height: fit-content;
  padding: 70px 0;
  box-sizing: border-box;
  border-radius: 20px;
  h1 {
    font-family: 'pretendard-medium';
    font-size: 18px;
    color: #ffffff;
  }
`;
const SloganImg = styled.img`
  width: 337px;
  height: 47px;
  object-fit: cover;
  margin-bottom: 69px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-bottom: 31px;
  input {
    background-color: inherit;
    outline-style: none;
    height: 53px;
    border-radius: 5px;
    padding-left: 20px;
    border: 0.5px solid #ffffff6f;
    font-family: 'pretendard-medium';
    font-size: 18px;
    color: white;
    ::placeholder {
      color: #404040;
    }
    &:focus {
      border: 0.5px solid #ffffff;
      transition: all 300ms ease-in-out;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transition: all 300ms ease-in-out;
    }
  }

  h1 {
    margin-bottom: 7px;
  }
`;
const LoginBtnWrapper = styled.button`
  width: 400px;
  height: 53px;
  display: flex;
  background-color: #ffa900;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin-top: 48px;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;
