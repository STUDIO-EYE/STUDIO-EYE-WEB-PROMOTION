import React, { useEffect, useState } from 'react';
import slogan from '@/assets/images/PA-Header/slogan.png';
import isNewIcon from '@/assets/images/PA-Header/isNewIcon.png';
import defaultIcon from '@/assets/images/PA-Header/defaultIcon.png';
import userIcon from '@/assets/images/PA-Header/userIcon.png';
import openIcon from '@/assets/images/PA-Header/openIcon.png';
import CircleBtn from './CircleBtn';
import styled from 'styled-components';
import { deleteNotification, fetchNotifications, updateNotification } from '@/apis/PromotionAdmin/notification';
import { INotification } from '@/types/PromotionAdmin/notification';
import { fetchRequests } from '@/apis/PromotionAdmin/request';
import { Request } from '@/types/request';
import NotificationList from './NotificationList';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';

const CircleBtns = [
  {
    id: 'notification',
    defaultIcon: defaultIcon,
    isNewIcon: isNewIcon,
  },
  {
    id: 'user',
    defaultIcon: userIcon,
  },
];

const Index = () => {
  const [iconStatus, setIconStatus] = useState<boolean>(false);
  const [isNotiOpened, setIsNotiOpened] = useState<boolean>(false);
  const [sortedNotifications, setSortedNotifications] = useState<INotification[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    console.log('흑', auth.userId);
    fetchData(auth.userId);
  }, []);

  useEffect(() => {
    if (isNotiOpened) {
      fetchData(auth.userId);
    }
  }, [isNotiOpened]);

  const fetchData = async (userId: number) => {
    try {
      const notifications: INotification[] = await fetchNotifications(userId);
      if (!notifications) {
        return;
      }
      const unreadNotificationsExist: boolean = notifications.some((notification) => !notification.isRead);
      setIconStatus(unreadNotificationsExist);
      setSortedNotifications(notifications);

      const requestsPromise = notifications.map(async (notification) => {
        const response = await fetchRequests({ requestId: notification.notification.requestId });
        return response;
      });

      const resolvedRequests = await Promise.all(requestsPromise);
      setRequests(resolvedRequests);
    } catch (error) {
      console.error('[❌Error fetching notifications or requests]', error);
    }
  };

  // const sortNotifications = (notifications: Notification[]): Notification[] => {
  //   const unreadNotifications = notifications.filter((notification) => !notification.isRead);
  //   const readNotifications = notifications.filter((notification) => notification.isRead);
  //   const sortedUnreadNotifications = unreadNotifications.sort((a, b) => a.id - b.id);
  //   const sortedReadNotifications = readNotifications.sort((a, b) => a.id - b.id);
  //   return sortedUnreadNotifications.concat(sortedReadNotifications);
  // };

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
      // 삭제 후 해당 항목을 sortedNotifications에서 제거
      const updatedNotifications = sortedNotifications.filter(
        (notification) => notification.notification.id !== notificationId,
      );
      setSortedNotifications(updatedNotifications);

      // 화면에 보여지는 알림들의 인덱스 재조정
      const updatedRequests = requests.filter((request) => request.id !== notificationId);
      setRequests(updatedRequests);
    } catch (error) {
      console.error('[❌Error updating notification]', error);
    }
  };

  return (
    <Container>
      <LeftWrapper>
        <img src={slogan} alt='pa-header-slogan' />
        <h1>오늘도 스튜디오 아이와 함께 좋은 하루 되세요, 엉금엉금님!</h1>
      </LeftWrapper>
      <RightWrapper>
        <OpenLinkWrapper href='http://ec2-3-35-22-220.ap-northeast-2.compute.amazonaws.com/' target='_blank'>
          <img src={openIcon} alt='pa-header-open' /> <span>Open Promotion Page</span>
        </OpenLinkWrapper>
        <CircleBtnWrapper>
          {CircleBtns.map((item, index) => (
            <button key={index}>
              <CircleBtn
                id={item.id}
                defaultIcon={item.defaultIcon}
                isNewIcon={
                  sortedNotifications.some((notification) => !notification.isRead) ? item.isNewIcon : item.defaultIcon
                }
                iconStatus={iconStatus}
                isNotiOpened={isNotiOpened}
                setIsNotiOpened={setIsNotiOpened}
              />
            </button>
          ))}
        </CircleBtnWrapper>
      </RightWrapper>
      {isNotiOpened && (
        <NotiContainer>
          <h1>Notification</h1>
          {requests.length === 0 && <NoDataConatiner>새로운 알림이 존재하지 않습니다.</NoDataConatiner>}
          {sortedNotifications.map((notification, index) => (
            <li key={index}>
              <NotificationList
                requestId={notification.notification.requestId}
                clientName={requests[index]?.clientName}
                description={requests[index]?.description}
                category={requests[index]?.category}
                isRead={notification.isRead}
                onClick={() => handleNotificationClick(notification.notification.id, auth.userId)}
                onDelete={() => handleNotificationDelete(notification.notification.id, auth.userId)}
              />
            </li>
          ))}
        </NotiContainer>
      )}
    </Container>
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
  position: absolute;
  top: 80px;
  right: 0px;
  margin-right: 100px;
  width: 507px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  z-index: 100;
  padding: 25px;
  box-sizing: border-box;
  overflow-y: scroll;
  li {
    margin-bottom: 10px;
    list-style: none;
  }

  h1 {
    color: #969696;
    font-family: 'pretendard-semibold';
    font-size: 16px;
    margin-bottom: 23px;
  }
`;

const NoDataConatiner = styled.div`
  font-family: 'pretendard-semibold';
`;
