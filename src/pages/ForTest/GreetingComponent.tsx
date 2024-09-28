import axios from 'axios';
import React, { useEffect, useState } from 'react';

//API 호출용 컴포넌트로 프로젝트에 쓰이지 않음.

const GreetingComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGreeting = async () => {
      const response = await axios.get(`http://www.studioeye-promotion.kro.kr:8080/api/greeting`);
      const data = await response;
      setMessage(data.data);
      console.log(message)
    };
    fetchGreeting();
  }, []);

  return <div>{message}</div>;
};

export default GreetingComponent;