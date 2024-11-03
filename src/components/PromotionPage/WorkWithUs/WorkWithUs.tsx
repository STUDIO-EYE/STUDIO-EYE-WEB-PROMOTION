import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Circle from '../Circle/Circle';
import { theme } from '@/styles/theme';

function WorkWithUs() {
  const navigator = useNavigate();
  return (
    <Container>
      <div>
        <Title
          dangerouslySetInnerHTML={{
            __html: `LET'S COLLABORATE <br /> <span style="color:#ffa900;">WORK</span> WITH US!`
          }}
        />
        <Link onClick={() => navigator(`/${PP_ROUTES_CHILD.CONTACT}`)}>스튜디오아이에 프로젝트 문의하기 →</Link>
      </div>
      <CircleWrapper>
        <Circle label='CONTACT US' />
      </CircleWrapper>
    </Container>
  );
}

export default WorkWithUs;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-around;
  margin-top: 50px;
  padding: 20px 60px;
  
  @media ${theme.media.mobile} {
    padding: 0.75rem;
    margin: 0;
    margin-bottom: 5rem;

    align-items: center;
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-family: 'pretendard-bold';
  font-size: 96px;
  line-height: normal;
  color: white;
  div {
    display: flex;
  }
  margin-bottom: 35px;
  @media ${theme.media.tablet} {
    font-size: 5rem;
  }
  @media ${theme.media.mobile} {
    font-size: 2.5rem;
    text-align: center;

  }
`;

const Link = styled.a`
  font-family: 'pretendard-bold';
  font-size: 28px;
  cursor: pointer;
  color: #d7d7d7;
  &:hover {
    color: #ffa900;
    transition: all 300ms ease-in-out;
  }

  @media ${theme.media.mobile} {
    width: 100%;
    font-size: 1.3rem;
    display: block;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const CircleWrapper = styled.div`
  @media ${theme.media.tablet} {
    display: none;
  }

  @media ${theme.media.mobile} {
    display: block;
  }
`;
