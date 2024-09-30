import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllMenuData, postMenuData, deleteMenuData, putMenuData } from '@/apis/PromotionAdmin/menu';
import Button from '@/components/PromotionAdmin/DataEdit/StyleComponents/Button';

interface IMenuData {
  id: number;
  title: string;
  visibility: boolean;
}

function MenuPage() {
  const [menuList, setMenuList] = useState<IMenuData[]>([]);
  const [newMenuTitle, setNewMenuTitle] = useState('');
  const [newMenuVisibility, setNewMenuVisibility] = useState(true);
  const [editMenuId, setEditMenuId] = useState<number | null>(null);
  const [editMenuTitle, setEditMenuTitle] = useState('');
  const [editMenuVisibility, setEditMenuVisibility] = useState(true);

  const fetchMenuData = async () => {
    try {
      const data = await getAllMenuData();
      if (Array.isArray(data)) {
        setMenuList(data);
      } else if (data && Array.isArray(data.data)) {
        setMenuList(data.data);
      } else {
        setMenuList([]);
      }
    } catch (error) {
      console.error('error: ', error);
      setMenuList([]);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleCreateMenu = async () => {
    const requestBody = {
      title: newMenuTitle,
      visibility: newMenuVisibility,
    };

    try {
      await postMenuData(requestBody);
      setNewMenuTitle('');
      setNewMenuVisibility(true);
      fetchMenuData();
    } catch (error) {
      console.error('error:', error);
    }
  };

  const handleDeleteMenu = async (menuId: number) => {
    try {
      await deleteMenuData(menuId);
      fetchMenuData();
    } catch (error) {
      console.error('error:', error);
    }
  };

  const handleEditMenu = (menu: IMenuData) => {
    setEditMenuId(menu.id);
    setEditMenuTitle(menu.title);
    setEditMenuVisibility(menu.visibility);
  };

  const handleUpdateMenu = async (menuId: number) => {
    const updatedTitle = editMenuTitle;
    const updatedVisibility = editMenuVisibility;

    try {
      await putMenuData(menuId, updatedTitle, updatedVisibility);
      fetchMenuData();
      setEditMenuId(null);
    } catch (error) {
      console.error('error:', error);
    }
  };
  return (
    <Wrapper>
      <TitleWrapper>
        <h1>메뉴 관리</h1>
      </TitleWrapper>

      <MenuWrapper>
        <AddMenuSection>
          <Form>
            <h3>새로운 메뉴 추가</h3>
            <InputWrapper>
              <Input
                type="text"
                value={newMenuTitle}
                onChange={(e) => setNewMenuTitle(e.target.value)}
                placeholder="메뉴 제목"
              />
              <ToggleWrapper>
                <ToggleSwitch
                  type="button"
                  onClick={() => setNewMenuVisibility(!newMenuVisibility)}
                  isChecked={newMenuVisibility}
                />
                <ToggleLabel isChecked={newMenuVisibility}>
                  {newMenuVisibility ? "공개" : "비공개"}
                </ToggleLabel>
              </ToggleWrapper>
            </InputWrapper>
            <Button description="메뉴 추가" onClick={handleCreateMenu} width={100} />
          </Form>
        </AddMenuSection>

        <MenuListSection>
          <MenuList>
            {menuList.map((menu) => (
              <MenuItem key={menu.id}>
                {editMenuId === menu.id ? (
                  <Form>
                    <InputWrapper>
                      <Input
                        type="text"
                        value={editMenuTitle}
                        onChange={(e) => setEditMenuTitle(e.target.value)}
                      />
                      <ToggleWrapper>
                        <ToggleLabel isChecked={editMenuVisibility}>
                          {editMenuVisibility ? "공개" : "비공개"}
                        </ToggleLabel>
                        <ToggleSwitch
                          type="button"
                          onClick={() => setEditMenuVisibility(!editMenuVisibility)}
                          isChecked={editMenuVisibility}
                        />
                      </ToggleWrapper>
                    </InputWrapper>
                    <Button description="수정 완료" onClick={() => handleUpdateMenu(menu.id)} width={100} />
                  </Form>
                ) : (
                  <div>
                    <span>{menu.title}</span>
                    <span>{menu.visibility ? "공개" : "비공개"}</span>
                    <Button description="수정" onClick={() => handleEditMenu(menu)} width={100} />
                    <Button description="삭제" onClick={() => handleDeleteMenu(menu.id)} width={100} />
                  </div>
                )}
              </MenuItem>
            ))}
          </MenuList>
        </MenuListSection>
      </MenuWrapper>
    </Wrapper>
  );
}

export default MenuPage;

const Wrapper = styled.div`
font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80vw;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const TitleWrapper = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
`;

const AddMenuSection = styled.div`
  flex-grow: 1;
  padding: 15px;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const MenuListSection = styled.div`
  flex-grow: 1;
  padding: 15px;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    outline: none;
    font-family: ${(props) => props.theme.font.regular};
    font-size: 14px;
    padding-left: 10px;
    width: 100%;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  input:focus {
    transition: 0.2s;
    border-bottom: 3px solid ${(props) => props.theme.color.symbol};
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface ToggleProps {
  isChecked: boolean;
}

const ToggleLabel = styled.span<ToggleProps>`
  margin-right: 10px;
  font-size: 14px;
  color: ${(props) => (props.isChecked ? "green" : "red")};
`;

const ToggleSwitch = styled.button<ToggleProps>`
  width: 50px;
  height: 25px;
  border-radius: 15px;
  background-color: ${(props) => (props.isChecked ? "green" : "red")};
  position: relative;
  cursor: pointer;
  outline: none;
  border: none;

  &:before {
    content: '';
    position: absolute;
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
    top: 1.5px;
    left: ${(props) => (props.isChecked ? "26px" : "2px")};
    transition: left 0.2s;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
