import { IRequestData } from '@/types/PromotionAdmin/request';
import React, { useState } from 'react';
import styled from 'styled-components';

interface UserInfoProps {
  clickedRequest: IRequestData;
}

const UserInfo: React.FC<UserInfoProps> = ({ clickedRequest }) => {
  const [userInfoExpanded, setUserInfoExpanded] = useState(false);

  const toggleUserInfoExpansion = () => {
    setUserInfoExpanded(!userInfoExpanded);
  };

  return (
    <UserInfoWrapper>
      <UserInfoTitle onClick={toggleUserInfoExpansion}>클라이언트 정보</UserInfoTitle>
      {userInfoExpanded && (
        <UserInfoTable>
          <tbody>
            <UserInfoRow>
              <UserInfoLabel>이메일</UserInfoLabel>
              <UserInfoData>{clickedRequest.email}</UserInfoData>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>카테고리</UserInfoLabel>
              <UserInfoData>{clickedRequest.category}</UserInfoData>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>조직</UserInfoLabel>
              <UserInfoData>{clickedRequest.organization}</UserInfoData>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>연락처</UserInfoLabel>
              <UserInfoData>{clickedRequest.contact}</UserInfoData>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>직책</UserInfoLabel>
              <UserInfoData>{clickedRequest.position}</UserInfoData>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoLabel>첨부파일</UserInfoLabel>
              <UserInfoData>
                <ul>
                  {clickedRequest?.fileUrlList.map((url: string, index: number) => {
                    try {
                      const decodedUrl = decodeURIComponent(url);
                      const fileName = decodedUrl.split('amazonaws.com/')[1];

                      return (
                        <li key={index}>
                          -{' '}
                          <Link href={decodedUrl} target='_blank' rel='noopener noreferrer'>
                            {fileName}
                          </Link>
                        </li>
                      );
                    } catch (error) {
                      console.error('Invalid URL or decoding error:', url);
                      return (
                        <li key={index}>
                          - <span>파일명 표시 오류</span>
                        </li>
                      );
                    }
                  })}
                </ul>
              </UserInfoData>
            </UserInfoRow>
          </tbody>
        </UserInfoTable>
      )}
    </UserInfoWrapper>
  );
};

const UserInfoWrapper = styled.div`
  margin-top: 1rem;
`;

const UserInfoTitle = styled.div`
  width: fit-content;
  cursor: pointer;
  color: gray;
  font-weight: bold;
  margin-bottom: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const UserInfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const UserInfoRow = styled.tr`
  /* border-bottom: 1px solid #eaeaea; */
`;

const UserInfoLabel = styled.td`
  padding: 0.5rem;
  font-weight: 600;
  width: 30%;
`;

const UserInfoData = styled.td`
  padding: 0.5rem;
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default UserInfo;
