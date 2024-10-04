import { deleteNews, getNewsDetail } from '@/apis/PromotionAdmin/news';
import { INEWS } from '@/types/PromotionAdmin/news';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as DOTS} from '@/assets/images/PA/3dot_Column.svg';
import { MSG } from '@/constants/messages';

const NewsViewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery<INEWS, Error>(['newsDetail',id], ()=>getNewsDetail(Number(id)));
  const news=data;

  const navigator = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const listPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
  const [isEditing,setIsEditing]=useState(false)
  const handleEditNews=()=>{
    setIsEditing(true)
    setMore(false)
    navigator(`edit`)
  }
  const sharedNews={news:news,setIsEditing}

  // const formatDate = (date: Date): string => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  const handleDelete=async ()=>{
    if(window.confirm(MSG.CONFIRM_MSG.DELETE)){
      try{
        const response=await deleteNews(Number(id))
        // if (response.code === 400 && response.data === null) { //에러메시지 있을 때
          alert(MSG.ALERT_MSG.DELETE)
          navigator(listPath)
          return;
        // }
      }catch (error: any) {
        alert(MSG.CONFIRM_MSG.FAILED)
      }
    }else{
      setMore(false)
    }
  }

  //more 버튼 관련----------------------------------------
  const [more,setMore]=useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<SVGSVGElement>(null); // 버튼의 위치를 가져오기 위한 ref
  const menuRef = useRef<HTMLUListElement>(null); // 메뉴의 ref 타입
  const handleToggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY+5, // 버튼의 하단 위치
        left: rect.right + window.scrollX-90,  // 버튼의 왼쪽 위치
      });
    }
    setMore((prev) => !prev);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setMore(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //----------------------------------------
  return (
    <Container>
      {isEditing?<Outlet context={sharedNews}/>: 
      <>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Title>{news?.title}</Title>
          <More ref={buttonRef} onClick={handleToggleMenu}/>
          {more?<Menu top={menuPosition.top} left={menuPosition.left} ref={menuRef}>
            <li onClick={handleDelete}>{MSG.BUTTON_MSG.DELETE}</li>
            <li onClick={handleEditNews}>{MSG.BUTTON_MSG.MODIFY}</li>
            </Menu>:null}
        </div>
        <Day>{news?.source+" | "+news?.pubDate}</Day>
        <Visibility>{"공개 여부: "+news?.visibility}</Visibility>
        <Content>{news?.url}</Content>
      </>}
    </Container>
  );
};

export default NewsViewPage;

const Container=styled.div`
margin-left: 10px;
width: 30rem;

display: flex;
flex-direction: column;
background-color: #e8e8e8;
padding: 5px;
border-radius: 5px;

overflow:hidden;
// white-space:nowrap;
text-overflow: ellipsis;
}
`

const Title=styled.div`
padding: 5px;
font-size: 1.5em;
font-family: 'pretendard-bold';
`
const Day=styled.div`
padding: 5px;
font-size: 0.9em;
font-family: 'pretendard';
`
const Visibility=styled.div`
padding: 5px;
font-size: 0.9em;
font-family: 'pretendard';
`
const Content=styled.div`
padding: 5px;
font-family: 'pretendard';
`
const More=styled(DOTS)`
width:18px;
height:18px;
margin-top:auto;
margin-bottom:auto;
margin-right:10px;
`
const Menu=styled.ul<{ top: number; left: number }>`
position: absolute;
top: ${({ top }) => top}px;
left: ${({ left }) => left}px;
background-color: white;
border: 1px solid #ddd;
border-radius: 5px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
padding: 10px;
list-style: none;
z-index: 100;
min-width: 60px;

li {
  padding: 8px;
  cursor: pointer;
  font-family: pretendard;
  font-size: 0.9em;
  white-space: nowrap;
  &:hover {
    background-color: #f1f1f1;
    border-radius:5px;
  }
}
`