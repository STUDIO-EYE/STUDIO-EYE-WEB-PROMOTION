import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  getAllMenuData,
  postMenuData,
  putMenuData,
} from '@/apis/PromotionAdmin/menu';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { theme } from '@/styles/theme';
import { DATAEDIT_TITLES_COMPONENTS } from '@/components/PromotionAdmin/DataEdit/Company/StyleComponents';

const defaultMenuData = ['ABOUT', 'ARTWORK', 'CONTACT', 'FAQ', 'RECRUITMENT', 'NEWS'];

interface IMenuData {
  id: number;
  title: string;
  visibility: boolean;
  sequence: number;
}

function MenuPage() {
  const [menuList, setMenuList] = useState<IMenuData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리

  const fetchMenuData = async () => {
    try {
      setIsLoading(true); // 데이터를 가져오는 동안 로딩 시작
      const data = await getAllMenuData();

      if (data && Array.isArray(data.data) && data.data.length > 0) {
        const updatedData = data.data
          .map((item: { id: number; menuTitle: string; visibility: boolean; sequence: number; }) => ({
            id: item.id,
            title: item.menuTitle,
            visibility: item.visibility,
            sequence: item.sequence,
          }))
          .sort((a: { sequence: number; }, b: { sequence: number; }) => a.sequence - b.sequence); // 오름차순 정렬

        setMenuList(updatedData);
      } else {
        await postDefaultMenuData();
      }
    } catch (error) {
      setMenuList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const postDefaultMenuData = async () => {
    try {
      const menusToPost = defaultMenuData.map((menuTitle) => ({
        menuTitle,
        visibility: true,
      }));

      await postMenuData(menusToPost);
      fetchMenuData();
    } catch (error) {
    }
  };

  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(menuList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedMenuList: IMenuData[] = items.map((menu, index) => ({
      ...menu,
      sequence: index,
    }));

    try {
      setMenuList(updatedMenuList);
      await putMenuData(updatedMenuList);
    } catch (error) {
    }
  };

  const handleVisibilityChange = async (menuId: number, visibility: boolean) => {
    try {
      const menuToUpdate = menuList.find(menu => menu.id === menuId);

      if (menuToUpdate) {
        const updatedMenuItem = {
          ...menuToUpdate,
          visibility: visibility,
        };

        await putMenuData([updatedMenuItem]);
        fetchMenuData();
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <Wrapper>
      <ContentBlock>
        <MenuWrapper>
          <MenuListSection>
            <TitleWrapper>
              {DATAEDIT_TITLES_COMPONENTS.MENU}
              메뉴 수정
            </TitleWrapper>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="menuList">
                {(provided: any) => (
                  <MenuList {...provided.droppableProps} ref={provided.innerRef}>
                    {isLoading ? (
                      <p>데이터를 불러오는 중...</p>
                    ) : menuList.length > 0 ? (
                      menuList.map((menu, index) => (
                        <Draggable key={menu.id} draggableId={menu.id.toString()} index={index}>
                          {(provided: any) => (
                            <MenuItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <MenuItemContent>
                                <MenuTitle>{menu.title}</MenuTitle>
                                <MenuActions>
                                  <Select
                                    value={menu.visibility ? '공개' : '비공개'}
                                    onChange={(e) => handleVisibilityChange(menu.id, e.target.value === '공개')}
                                  >
                                    <option value="공개">공개</option>
                                    <option value="비공개">비공개</option>
                                  </Select>
                                </MenuActions>
                              </MenuItemContent>
                            </MenuItem>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p>메뉴가 없습니다.</p>
                    )}
                    {provided.placeholder}
                  </MenuList>
                )}
              </Droppable>
            </DragDropContext>
          </MenuListSection>
        </MenuWrapper>
      </ContentBlock>
    </Wrapper>
  );
}

export default MenuPage;

const Wrapper = styled.div`
  font-family: 'pretendard-regular';
  width: 50vw;
`;

const ContentBlock = styled.div<{ width?: number; height?: number; isFocused?: boolean }>`
  padding: 25px;
  position: relative;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
  margin-bottom: 30px;
  margin-right: 30px;

  border-radius: 4px;
  width: ${(props) => (props.width ? props.width + 'px;' : '750px;')};
  height: ${(props) => (props.height ? props.height + 'px;' : 'fit-content;')};
  background-color: ${(props) => (props.isFocused ? theme.color.yellow.pale : theme.color.white.pale)};
  `;

const Select = styled.select`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 5px 10px;
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.white.bold};
  color: #494845;
  box-shadow: 1px 1px 4px 0.1px #c6c6c6;
`;

const MenuWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const MenuListSection = styled.div`
  padding: 25px;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  font-family: 'Pretendard-medium';
  font-size: 25px;
`;

const MenuItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MenuTitle = styled.span`
  font-family: 'Pretendard';
  font-size: 50px;
  font-weight: 800;
`;

const MenuActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-left: 50px;

  span {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  margin-top: 15px;
  width: 100%;
`;

const MenuItem = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 4px;
  border-radius: 8px;
  color: black;

  &:hover {
    background-color: #afafaf13;
    transition: 0.2s;
  }
`;
