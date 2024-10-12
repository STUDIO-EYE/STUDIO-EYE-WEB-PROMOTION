import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';

interface PostData {
  id: number;
  title: string;
  content: string;
}

const RecruitmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${PROMOTION_BASIC_PATH}/api/recruitment/${id}`)
      .then((response) => {
        setPost(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <Wrapper>
      {post ? (
        <>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <BackButton onClick={() => navigate('/recruitment')}>목록으로 돌아가기</BackButton>
        </>
      ) : (
        <LoadingMessage>Loading...</LoadingMessage>
      )}
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

const PostTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const PostContent = styled.p`
  font-size: 18px;
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: 30px;
  color: #555;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #ff530e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e64900;
  }
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  color: #999;
  text-align: center;
`;

export default RecruitmentDetailPage;
