import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const SkeletonArtworkCardComponent = () => {
  return (
    <SkeletonArtworkCard>
      <SkeletonArtworkImg />
      <SkeletonInfo>
        <div className="skeleton_client" />
        <div className="skeleton_name" />
      </SkeletonInfo>
    </SkeletonArtworkCard>
  );
};

export default SkeletonArtworkCardComponent;

const loading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonArtworkCard = styled(motion.div)`
  position: relative;
  cursor: pointer;
  height: fit-content;
  width: 250px;

  min-width: 350px;
  max-width: 350px;
  overflow: hidden;
`;

const SkeletonArtworkImg = styled(motion.div)`
  height: 350px;
  background: linear-gradient(90deg, #f0f0f0ad, #e0e0e0ad, #f0f0f0ad);
  background-size: 200% 100%;
  animation: ${loading} 1.5s infinite;
  /* border-radius: 0 150px 0 0; */
`;

const SkeletonInfo = styled(motion.div)`
  max-width: 350px;
  padding-top: 10px;

  .skeleton_client {
    width: 60%;
    height: 20px;
    margin-bottom: 5px;
    background: linear-gradient(90deg, #f0f0f0ad, #e0e0e0ad, #f0f0f0ad);
    background-size: 200% 100%;
    animation: ${loading} 1.5s infinite;
    border-radius: 4px;
  }

  .skeleton_name {
    width: 80%;
    height: 24px;
    background: linear-gradient(90deg, #f0f0f0ad, #e0e0e0ad, #f0f0f0ad);
    background-size: 200% 100%;
    animation: ${loading} 1.5s infinite;
    border-radius: 4px;
  }
`;

