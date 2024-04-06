import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.color.white.light};
  box-shadow: 1px 2px 20px 0.5px #c6c6c6;
  border-radius: 20px;
  position: fixed;
  left: 9rem;
  z-index: -1;
  top: 10rem;
  height: 80vh;
  width: 13rem;
`;

const SideBar = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const CategoryWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  background-color: ${({ selected }) =>
    selected ? theme.color.yellow.light : "none"};
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.black.bold};
`;

enum Categories {
  "FAQ_등록하기" = "FAQ 등록하기",
  "FAQ_관리하기" = "FAQ 관리하기",
}

const categories = [
  {
    name: Categories.FAQ_관리하기,
    path: `/admin/faq`,
  },
  {
    name: Categories.FAQ_등록하기,
    path: `/admin/faq/write`,
  },
];

function DetailNavigator() {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedMenu(location.pathname);
  }, [location]);

  return (
    <Wrapper>
      <SideBar>
        {categories.map((category, index) => (
          <CategoryWrapper
            key={index}
            onClick={() => {
              navigate(`${category.path}`);
              setSelectedMenu(category.path);
            }}
            selected={selectedMenu === category.path ? true : false}
          >
            <Category>{category.name}</Category>
          </CategoryWrapper>
        ))}
      </SideBar>
    </Wrapper>
  );
}

export default DetailNavigator;
