import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

function ScrollAnimatedComponent({ article }: string | any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        ease: 'easeInOut',
        duration: 2,
        y: { duration: 1 },
      }}
    >
      <Article data-cy='PP_article'>{article}</Article>
    </motion.div>
  );
}

export default ScrollAnimatedComponent;

const Article = styled.div`
  font-family: ${(props) => props.theme.font.semiBold};
`;
