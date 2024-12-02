import { getFAQData, IFAQ } from '@/apis/PromotionAdmin/faq';
import InnerHTML from '@/components/PromotionAdmin/DataEdit/StyleComponents/InnerHTML';
import { ContentBox } from '@/components/PromotionAdmin/FAQ/Components';
import SkeletonComponent from '@/components/PromotionPage/SkeletonComponent/SkeletonComponent';
import { PA_ROUTES } from '@/constants/routerConstants';
import { useQuery } from 'react-query';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function FAQCheckPage() {
  const navigator = useNavigate();
  const faqDetailMatch = useMatch(`${PA_ROUTES.FAQ}/:faqId`);
  const { data, isLoading, error } = useQuery<IFAQ[], Error>(['faq', 'id'], getFAQData);
  const clickedFAQ =
    faqDetailMatch?.params.faqId && data && data.find((faq) => String(faq.id) === faqDetailMatch.params.faqId);

  const currentPage = new URLSearchParams(useLocation().search).get('page');

  if (isLoading) return <SkeletonComponent width={'40vw'} height={'800px'}/>;
  if (error) return <>{error.message}</>;
  return (
    <>
      {faqDetailMatch ? (
        <>
          {clickedFAQ && (
            <ContentBox data-testid="faq-detail">
              <Wrapper>
                <TitleWrapper>
                  <QAIcon>Q</QAIcon>
                  <Title data-testid="faq-question-text">{clickedFAQ.question}</Title>
                </TitleWrapper>
                <QAIcon>A</QAIcon>
                <Answer data-testid="faq-answer">
                  <InnerHTML description={clickedFAQ.answer} fontSize={20} />
                </Answer>
                <ButtonWrapper>
                  <Button
                    data-testid="faq-edit-button"
                    onClick={() => {
                      navigator(`${PA_ROUTES.FAQ}/write/${clickedFAQ.id}?page=${currentPage}`);
                    }}
                  >
                    수정하기
                  </Button>
                </ButtonWrapper>
              </Wrapper>
            </ContentBox>
          )}
        </>
      ) : null}
    </>
  );
}

// Styled components
const Wrapper = styled.div``;
const TitleWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
  height: 80px;
  width: 90%;
  line-height: 23px;
  font-size: 20px;
  font-family: ${(props) => props.theme.font.regular};
`;

const QAIcon = styled.div`
  margin: 10px 20px;
  background-color: ${(props) => props.theme.color.yellow.light};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 100%;
  font-size: 1.1rem;
  margin-right: 0.5rem;
`;

const Answer = styled.div`
  padding: 0 30px;
  margin-top: 20px;
  img {
    max-width: 100%;
  }
  height: 33rem;
  overflow: scroll;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.color.white.bold};
  box-shadow: 1px 1px 4px 0.1px ${(props) => props.theme.color.black.pale};
  padding: 0.4rem 1.4rem;
  border-radius: 0.2rem;
`;
