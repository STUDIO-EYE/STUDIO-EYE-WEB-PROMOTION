import React, { useEffect, useRef, useState } from 'react';
import slogan from '@/assets/images/PA-Header/slogan.png';
import isNewIcon from '@/assets/images/PA-Header/isNewIcon.png';
import defaultIcon from '@/assets/images/PA-Header/defaultIcon.png';
import openIcon from '@/assets/images/PA-Header/openIcon.png';
import CircleBtn from '@/components/PromotionAdmin/Header/CircleBtn';
import styled from 'styled-components';
import { deleteNotification, fetchNotifications, updateNotification } from '@/apis/PromotionAdmin/notification';
import { INotification } from '@/types/PromotionAdmin/notification';
import { fetchRequests } from '@/apis/PromotionAdmin/request';
import { Request } from '@/types/request';
import NotificationList from '@/components/PromotionAdmin/Header/NotificationList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, notiState } from '@/recoil/atoms';
import { PP_ADDRESS } from '@/constants/promotionpage';

const CircleBtns = [
  {
    id: 'notification',
    defaultIcon: defaultIcon,
    isNewIcon: isNewIcon,
  },
];

const Index = () => {
  const [iconStatus, setIconStatus] = useState<boolean>(false);
  const [isNotiOpened, setIsNotiOpened] = useRecoilState(notiState);
  const [sortedNotifications, setSortedNotifications] = useState<INotification[]>([]);
  const [requests, setRequests] = useState<Record<number, Request>>({});
  const auth = useRecoilValue(authState);
  const notiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (auth.userId) fetchData(auth.userId);
  }, [auth.userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNotiOpened && notiContainerRef.current && !notiContainerRef.current.contains(event.target as Node)) {
        setIsNotiOpened(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNotiOpened]);

  const fetchData = async (userId: number) => {
    try {
      const notifications: INotification[] = await fetchNotifications(userId);
      if (!notifications || notifications.length === 0) {
        setIconStatus(false);
        setSortedNotifications([]);
        setRequests({});
        return;
      }
      const unreadNotificationsExist = notifications.some((notification) => !notification.isRead);
      setIconStatus(unreadNotificationsExist);
  
      const sorted = notifications.sort((a, b) => Number(b.isRead) - Number(a.isRead));
      const validNotifications: INotification[] = [];
      const requestsMap: Record<number, Request> = {};
  
      // 요청을 비동기적으로 가져오고 삭제된 요청 필터링
      for (const notification of sorted) {
        try {
          const response = await fetchRequests({ requestId: notification.notification.requestId });
          if (response) {
            validNotifications.push(notification);
            requestsMap[notification.notification.requestId] = response;
          }
        } catch (error) {
          console.warn(`[❗ 삭제된 요청] ID ${notification.notification.requestId}은/는 유효하지 않습니다.`);
        }
      }
  
      setSortedNotifications(validNotifications);
      setRequests(requestsMap);
  
      if (validNotifications.length === 0) setIconStatus(false);
    } catch (error) {
      console.error('[❌Error fetching notifications or requests]', error);
    }
  };
  

  const handleNotificationClick = async (notificationId: number, userId: number) => {
    try {
      await updateNotification(notificationId, userId);
      fetchData(userId);
    } catch (error) {
      console.error('[❌Error updating notification]', error);
    }
  };

  const handleNotificationDelete = async (notificationId: number, userId: number) => {
    try {
      await deleteNotification(notificationId, userId);
      const updatedNotifications = sortedNotifications.filter(
        (notification) => notification.notification.id !== notificationId
      );
      setSortedNotifications(updatedNotifications);
  
      // 삭제되지 않은 알림들의 requestId만 유지
      const remainingRequests = updatedNotifications.reduce((acc, notification) => {
        const requestId = notification.notification.requestId;
        if (requests[requestId]) {
          acc[requestId] = requests[requestId];
        }
        return acc;
      }, {} as Record<number, Request>);
      
      setRequests(remainingRequests);
  
      // 모든 알림이 삭제된 경우 상태 리셋
      if (updatedNotifications.length === 0) setIconStatus(false);
    } catch (error) {
      console.error('[❌Error deleting notification]', error);
    }
  };
  

  return (
    <>
      <Container>
        <LeftWrapper>
          <img src={slogan} alt="pa-header-slogan" />
          <h1>오늘도 스튜디오 아이와 함께 좋은 하루 되세요!</h1>
        </LeftWrapper>
        <RightWrapper>
          <OpenLinkWrapper href={PP_ADDRESS} target="_blank">
            <img src={openIcon} alt="pa-header-open" /> <span>Open Promotion Page</span>
          </OpenLinkWrapper>
          <CircleBtnWrapper>
            {CircleBtns.map((item, index) => (
              <button key={index}>
                <CircleBtn
                  id={item.id}
                  defaultIcon={item.defaultIcon}
                  isNewIcon={
                    sortedNotifications.some((notification) => !notification.isRead)
                      ? item.isNewIcon
                      : item.defaultIcon
                  }
                  iconStatus={iconStatus}
                />
              </button>
            ))}
          </CircleBtnWrapper>
        </RightWrapper>
      </Container>
      {isNotiOpened && (
        <NotiContainer ref={notiContainerRef}>
          <h1>Notification</h1>
          {!iconStatus && <NoDataContainer>새로운 알림이 존재하지 않습니다.</NoDataContainer>}
          {[...sortedNotifications].reverse().map((notification, index) => (
            <li key={index}>
            <NotificationList
              requestId={notification.notification.requestId}
              clientName={requests[notification.notification.requestId]?.clientName || '삭제된 요청'}
              description={requests[notification.notification.requestId]?.description || '이 요청은 삭제되었습니다.'}
              category={requests[notification.notification.requestId]?.category || '알 수 없음'}
              isRead={notification.isRead}
              onClick={() => handleNotificationClick(notification.notification.id, auth.userId)}
              onDelete={() => handleNotificationDelete(notification.notification.id, auth.userId)}
            />
            </li>
          ))}
        </NotiContainer>
      )}
    </>
  );
};

export default Index;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  box-shadow: 0px 0px 20px #00000025;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: #ffffffba;
  backdrop-filter: blur(10px);
`;

const LeftWrapper = styled.div`
  font-family: 'pretendard-semibold';
  font-size: 16px;
  margin-left: 30px;
  color: #000000e2;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const OpenLinkWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 221px;
  height: 36px;
  box-shadow: 0px 0px 10px #00000030;
  border-radius: 10px;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-right: 5px;
  }
  font-family: 'pretendard-semibold';
  font-size: 16px;
  color: #595959;
  margin-right: 40px;
`;

const CircleBtnWrapper = styled.div`
  display: flex;
  ul {
    margin-right: 40px;
  }
  button {
    border: none;
    background-color: inherit;
    cursor: pointer;
  }
`;

const NotiContainer = styled.div`
  // 임시로 abosolute 해둔 것
  position: fixed;
  top: 80px;
  right: 0px;
  width: 507px;
  height: 100vh;

  background-color: rgba(190, 190, 190, 0.07);
  backdrop-filter: blur(5px);
  z-index: 10;
  padding: 25px 25px 100px 25px;
  box-sizing: border-box;
  overflow-y: scroll;
  li {
    margin-bottom: 10px;
    list-style: none;
  }

  h1 {
    color: #595959;
    font-family: 'pretendard-semibold';
    font-size: 25px;
    margin-bottom: 15px;
  }
`;

const NoDataContainer = styled.div`
  font-size: 1rem;
  color: #aaa;
  text-align: center;
  padding: 1rem;
`;

