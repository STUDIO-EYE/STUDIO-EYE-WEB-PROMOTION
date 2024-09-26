import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GreetingComponent from './GreetingComponent';
import axios from 'axios';

// Axios 모킹 설정
jest.mock('axios');

describe('GreetingComponent', () => {
  it('should display the greeting message from API', async () => {
    // Axios의 get 메서드가 호출될 때, mockResolvedValueOnce를 사용하여 성공적인 응답을 정의
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: 'Hello World!',
    });

    render(<GreetingComponent />);

    // API 호출 후 'Hello World!'라는 텍스트가 화면에 나타나는지 기다림
    await waitFor(() => {
      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });
    
    // Axios의 get 메서드가 올바른 URL로 호출되었는지 확인
    expect(axios.get).toHaveBeenCalledWith('http://www.studioeye-promotion.kro.kr:8080/api/greeting');
  });
});