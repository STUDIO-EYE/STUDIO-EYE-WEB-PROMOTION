import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';

interface PostData {
  id: number;
  title: string;
  content: string;
}

const RecruitmentPage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const history = useHistory();

  // Fetch recruitment posts
  useEffect(() => {
    axios
      .get(`${PROMOTION_BASIC_PATH}/api/recruitment`)
      .then((response) => {
        setPosts(response.data.data); // Assuming the API returns an array of recruitment posts
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Handle clicking a post to navigate to the detail page
  const handleClickPost = (post: PostData) => {
    history.push(`/recruitment/${post.id}`);
  };

  return (
    <Wrapper>
      <Header>채용공고</Header>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id} onClick={() => handleClickPost(post)}>
            <PostTitle>{post.title}</PostTitle>
          </PostItem>
        ))}
      </PostList>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #ff530e;
  margin-bottom: 20px;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  padding: 20px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export default RecruitmentPage;
