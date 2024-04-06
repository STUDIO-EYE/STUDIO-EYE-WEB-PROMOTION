import { Outlet, useMatch, useNavigate } from "react-router-dom";
import Navigator from "../../../components/Common/Navigator";
import DetailNavigator from "./Components/DetailNavigator";
import styled from "styled-components";
import { ContentBox } from "./Components/ContentBox";
import SearchBar from "./Components/SearchBar";
import { useQuery } from "react-query";
import { IGetFAQData, getFAQData } from "../../../apis/PromotionAdmin/faq";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence, Variants } from "framer-motion";
import FAQEditPage from "./FAQEditPage";

const rowVariants: Variants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const Row = styled(motion.div)``;

const Overlay = styled(motion.div)`
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay: Variants = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const Wrapper = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
  padding: 0px 20px;
`;

const Icon = styled.div`
  padding-right: 0.8rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 1.3rem;
`;

const Info = styled.div`
  height: 20px;
  display: flex;
  align-items: end;
  padding-left: 8px;
  font-size: 10px;
  color: gray;
`;

const QAIcon = styled.div`
  background-color: ${(props) => props.theme.color.yellow.light};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

const QuestionTitleWrapper = styled(motion.div)`
  cursor: pointer;
  margin-left: 1rem;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const QuestionTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const EditButtonWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white.bold};
  border-radius: 5px;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  width: 90px;
  box-shadow: 1px 1px 1px 0.2px #c6c6c6;
  padding: 5px;
`;
const EditButton = styled.div`
  #switch {
    position: absolute;
    /* hidden */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .switch_label {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 35px;
    height: 14px;
    background: #fff;
    border: 1px solid ${(props) => props.theme.color.yellow.bold};
    border-radius: 20px;
    transition: 0.2s;
  }

  .onf_btn {
    position: absolute;
    top: 1px;
    left: 2px;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: ${(props) => props.theme.color.yellow.bold};
    transition: 0.2s;
  }

  /* checking style */
  #switch:checked + .switch_label {
    background: ${(props) => props.theme.color.yellow.bold};
    border: 1px solid ${(props) => props.theme.color.yellow.bold};
  }

  #switch:checked + .switch_label:hover {
    background: ${(props) => props.theme.color.yellow.bold};
  }

  /* move */
  #switch:checked + .switch_label .onf_btn {
    left: 21px;
    background: #fff;
    box-shadow: 1px 2px 3px #00000020;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  &:hover {
    background-color: ${(props) => props.theme.color.yellow.light};
  }
`;

const EditModal = styled(motion.div)`
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;
const DeleteButton = styled.button`
  border: none;
  box-shadow: 1px 2px 3px #00000020;
  background-color: ${(props) => props.theme.color.white.light};
`;

function FAQManagePage() {
  const navigator = useNavigate();
  const faqEditMatch = useMatch("/admin/faq/write/:faqId");

  const { data, isLoading, refetch } = useQuery<IGetFAQData>(
    ["faq", "id"],
    getFAQData
  );
  const [editMode, setEditMode] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const [id, setId] = useState<null | string>(null);

  const handleDelete = (id: number) => {
    console.log("delete", id);
    axios
      .delete(`http://3.35.54.100:8080/api/faq/${id}`)
      .then((response) => {
        console.log("삭제", response);
      })
      .catch((error) => console.log(error));
    refetch();
  };

  const clickedFAQ =
    faqEditMatch?.params.faqId &&
    data?.data.find((faq) => String(faq.id) === faqEditMatch.params.faqId);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  useEffect(() => {
    console.log("refetch");
    refetch();
  }, [clickedFAQ]);
  return (
    <>
      <Navigator />
      <DetailNavigator />
      <ContentBox>
        <TitleWrapper>
          <Title>
            <Icon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7692 1H4.07692C3.66889 1 3.27758 1.16209 2.98906 1.4506C2.70055 1.73912 2.53846 2.13043 2.53846 2.53846V16.3846L1 21L7.15385 19.4615H19.4615C19.8695 19.4615 20.2609 19.2994 20.5494 19.0109C20.8378 18.7225 21 18.3311 21 17.9231V10.2308"
                  stroke="#FFA900"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.0973 12.7486L8.48193 13.5793L9.25116 8.9024L16.5281 1.65625C16.6711 1.51205 16.8412 1.39759 17.0288 1.31949C17.2161 1.24138 17.4172 1.20117 17.6205 1.20117C17.8235 1.20117 18.0246 1.24138 18.212 1.31949C18.3995 1.39759 18.5697 1.51205 18.7128 1.65625L20.3435 3.28701C20.4877 3.43003 20.6021 3.6002 20.6803 3.78767C20.7583 3.97514 20.7986 4.17623 20.7986 4.37932C20.7986 4.58241 20.7583 4.7835 20.6803 4.97098C20.6021 5.15846 20.4877 5.32861 20.3435 5.47163L13.0973 12.7486Z"
                  stroke="#FFA900"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Icon>
            FAQ 게시글 관리
            <Info>등록 게시글 {data?.data.length}건</Info>
          </Title>
          <EditButtonWrapper>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 2C1.23478 2 0.98043 2.10536 0.792893 2.29289C0.605357 2.48043 0.5 2.73478 0.5 3V12.5C0.5 12.7652 0.605357 13.0196 0.792893 13.2071C0.98043 13.3946 1.23478 13.5 1.5 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3946 13.0196 13.5 12.7652 13.5 12.5V3C13.5 2.73478 13.3946 2.48043 13.2071 2.29289C13.0196 2.10536 12.7652 2 12.5 2H10.5"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 0.5V3.5"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 0.5V3.5"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 2H8.5"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 6.86404L5.86842 10.9956L4 11.25L4.26316 9.38158L8.38596 5.25L10 6.86404Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit
            <EditButton>
              <input
                type="checkbox"
                id="switch"
                onClick={() => {
                  setEditMode((prev) => !prev);
                }}
              />
              <label htmlFor="switch" className="switch_label">
                <span className="onf_btn"></span>
              </label>
            </EditButton>
          </EditButtonWrapper>
        </TitleWrapper>
        {isLoading ? (
          <>is Loading...</>
        ) : (
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
            >
              {data?.data.map((faq) => (
                <ListWrapper
                  onClick={() => {
                    !editMode && navigator(`/admin/faq/write/${faq.id}`);
                    setId(faq.id + "");
                  }}
                >
                  {editMode && (
                    <DeleteButton
                      onClick={() => {
                        handleDelete(faq.id);
                        window.location.reload();
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 3.5H13"
                          stroke="black"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2.5 3.5H11.5V12.5C11.5 12.7652 11.3946 13.0196 11.2071 13.2071C11.0196 13.3946 10.7652 13.5 10.5 13.5H3.5C3.23478 13.5 2.98043 13.3946 2.79289 13.2071C2.60536 13.0196 2.5 12.7652 2.5 12.5V3.5Z"
                          stroke="black"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.5 3.5V3C4.5 2.33696 4.76339 1.70107 5.23223 1.23223C5.70107 0.763392 6.33696 0.5 7 0.5C7.66304 0.5 8.29893 0.763392 8.76777 1.23223C9.23661 1.70107 9.5 2.33696 9.5 3V3.5"
                          stroke="black"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.5 6.50098V10.5025"
                          stroke="black"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.5 6.50098V10.5025"
                          stroke="black"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </DeleteButton>
                  )}
                  <QuestionTitleWrapper layoutId={faq.id + ""} key={faq.id}>
                    <QuestionTitle>
                      <QAIcon>Q</QAIcon>
                      {faq.title}
                    </QuestionTitle>
                  </QuestionTitleWrapper>
                </ListWrapper>
              ))}
            </Row>
          </AnimatePresence>
        )}
      </ContentBox>

      <AnimatePresence>
        {faqEditMatch ? (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <EditModal layoutId={faqEditMatch.params.faqId}>
              {clickedFAQ && (
                <>
                  <FAQEditPage
                    title={clickedFAQ.title}
                    content={clickedFAQ.content}
                    id={clickedFAQ.id}
                  />
                </>
              )}
            </EditModal>
          </Overlay>
        ) : null}
      </AnimatePresence>
      {/* <SearchBar /> */}
      <Outlet />
    </>
  );
}

export default FAQManagePage;
