import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import styled from 'styled-components';

interface PostData {
  id: number;
  title: string;
  content: string;
}

const RecruitmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);

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
          <BackButton onClick={() => window.history.back()}>목록으로 돌아가기</BackButton>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Wrapper>
  );
};

export default RecruitmentDetailPage;

const Wrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const PostTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PostContent = styled.p`
  font-size: 18px;
  line-height: 1.6;
  white-space: pre-line;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #ff530e;
  border: none;
  cursor: pointer;
`;
