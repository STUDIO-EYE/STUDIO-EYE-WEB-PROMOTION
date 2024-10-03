import React, { useEffect, useState } from 'react';
import styled, { ExecutionProps } from 'styled-components';
import {
  getAllMenuData,
  deleteMenuData,
  putMenuData,
} from '@/apis/PromotionAdmin/menu';
import Button from '@/components/PromotionAdmin/DataEdit/StyleComponents/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FastOmit, Substitute } from 'styled-components/dist/types';
import { theme } from '@/styles/theme';
import { DATAEDIT_TITLES_COMPONENTS } from '@/components/PromotionAdmin/DataEdit/Company/StyleComponents';

interface IMenuData {
  id: number;
  title: string;
  visibility: boolean;
}

function MenuPage() {
  const [menuList, setMenuList] = useState<IMenuData[]>([]);
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

  const handleDeleteMenu = async (menuId: number) => {
    try {
      await deleteMenuData(menuId);
      fetchMenuData();
    } catch (error) {
      console.error('error:', error);
    }
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(menuList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMenuList(items);
  };

  const handleVisibilityChange = async (menuId: number, visibility: boolean) => {
    try {
      await putMenuData(menuId, menuList.find(menu => menu.id === menuId)?.title || '', visibility);
      fetchMenuData();
    } catch (error) {
      console.error('error:', error);
    }
  };

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
                {(provided: { droppableProps: React.JSX.IntrinsicAttributes & FastOmit<Substitute<FastOmit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, never>, FastOmit<{}, never>>, keyof ExecutionProps> & FastOmit<ExecutionProps, "as" | "forwardedAs"> & { as?: void | undefined; forwardedAs?: void | undefined; }; innerRef: React.LegacyRef<HTMLUListElement> | undefined; placeholder: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                  <MenuList {...provided.droppableProps} ref={provided.innerRef}>
                    {menuList.map((menu, index) => (
                      <Draggable key={menu.id} draggableId={menu.id.toString()} index={index}>
                        {(provided: { innerRef: React.LegacyRef<HTMLLIElement> | undefined; draggableProps: React.JSX.IntrinsicAttributes & FastOmit<Substitute<FastOmit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, never>, FastOmit<{}, never>>, keyof ExecutionProps> & FastOmit<ExecutionProps, "as" | "forwardedAs"> & { as?: void | undefined; forwardedAs?: void | undefined; }; dragHandleProps: React.JSX.IntrinsicAttributes & FastOmit<Substitute<FastOmit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, never>, FastOmit<{}, never>>, keyof ExecutionProps> & FastOmit<ExecutionProps, "as" | "forwardedAs"> & { as?: void | undefined; forwardedAs?: void | undefined; }; }) => (
                          <MenuItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <MenuItemContent>
                              <MenuTitle>{menu.title}</MenuTitle>
                              <MenuActions>
                                <Button description="삭제" onClick={() => handleDeleteMenu(menu.id)} width={100} />
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
                    ))}
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

  &:hover {
    background-color: #afafaf13;
    transition: 0.2s;
  }
`;