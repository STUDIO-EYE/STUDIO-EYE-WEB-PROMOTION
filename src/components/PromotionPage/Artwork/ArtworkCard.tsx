import { useNavigate } from 'react-router-dom';
import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';

interface IArtworkCardProps {
  id: number;
  name: string;
  client: string;
  mainImg: string;
  category: string;
}

function ArtworkCard({ id, name, client, mainImg, category }: IArtworkCardProps) {
  const navigator = useNavigate();

  return (
    <ArtworkItem
      data-cy='PP_artwork'
      onClick={() => navigator(`/${PP_ROUTES_CHILD.ARTWORK}/${id}`, { state: { category } })}
      variants={itemVariants}
      initial='initial'
      whileHover='hover'
    >
      <ArtworkImg data-cy='PP_artwork_img' key={mainImg} variants={imgVariants(mainImg)} ArtworkPhoto={mainImg}>
        <img src={mainImg} />
        <div className='overlay' />
      </ArtworkImg>
      <Info>
        <motion.span data-cy='PP_artwork_client' variants={spanVariants} className='info_client'>
          {client}
        </motion.span>
        <motion.span data-cy='PP_artwork_title' variants={spanVariants} className='info_name'>
          {name}
        </motion.span>
      </Info>
    </ArtworkItem>
  );
}

export default ArtworkCard;

const itemVariants = {
  hover: {
    transition: {
      when: 'beforeChildren',
      // staggerChildren: 0.1,
    },
  },
};

const spanVariants = {
  hover: {
    color: `${theme.color.symbol}`,
  },
};

const imgVariants = (ArtworkPhoto: string) => ({
  hover: {
    background: `linear-gradient(rgba(255, 169, 2, 0.4), rgba(255, 169, 2, 0.4)), url(${ArtworkPhoto})`,
    backgroundSize: 'cover', // 이미지 크기 조정
    backgroundPosition: 'center', // 이미지 위치 조정
    borderRadius: '0 150px 0 0', // 오른쪽 상단 모서리를 둥글게 설정
  },
});

const ArtworkItem = styled(motion.div)`
  position: relative;
  cursor: pointer;
  height: fit-content;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
    background: linear-gradient(rgba(255, 169, 2, 0.4), rgba(255, 169, 2, 0.4));
  }

  &:hover {
    img {
      transform: scale(1.05, 1.05);
    }
  }

  &:hover .overlay {
    top: 0;
    left: 0;
    position: absolute;
    width: 350px;
    height: 350px;
    transition: 0.3s;
    background-color: rgba(255, 169, 2, 0.4);
    border-radius: 0 150px 0 0;
    pointer-events: none;
  }

  @media ${theme.media.mobile} {
    &:hover .overlay {
      width: 20rem;
      height: 20rem;
      top: 0;
      left: 0;
    }
  }
`;

const ArtworkImg = styled(motion.div)<{ ArtworkPhoto: string }>`
  width: 250px;
  min-width: 350px;
  max-width: 350px;
  height: 350px;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${(props) => props.ArtworkPhoto});
  overflow: hidden;
  margin: 0 auto;

  @media ${theme.media.mobile} {
    width: 20rem;
    min-width: 20rem;
    max-width: 20rem;
    height: 20rem;
    position: relative;
    &:hover {
      border-radius: 0 150px 0 0;
    }
  }
`;

const Info = styled(motion.div)`
  max-width: 350px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  padding-top: 10px;

  .info_client {
    display: block;
    padding-bottom: 5px;
    font-size: 18px;
    font-family: ${(props) => props.theme.font.medium};
    color: ${(props) => props.theme.color.black.light};
    padding: 10px 0 8px 0;
  }

  .info_name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 24px;
    color: ${(props) => props.theme.color.white.bold};
    font-family: ${(props) => props.theme.font.semiBold};
  }

  @media ${theme.media.mobile} {
    margin: 0 auto 2rem 0;
    position: relative;
    width: 100%;
    min-width: 20rem;
    max-width: 20rem;
    padding: 0;
  }
`;
