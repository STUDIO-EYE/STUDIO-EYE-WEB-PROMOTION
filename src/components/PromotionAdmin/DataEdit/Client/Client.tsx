import { getClientPaginateData } from '@/apis/PromotionAdmin/dataEdit';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IClientPaginationData } from '@/types/PromotionAdmin/dataEdit';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import { ReactComponent as PublicIcon } from '@/assets/images/PA/public.svg';
import { ReactComponent as PrivateIcon } from '@/assets/images/PA/private.svg';

import Button from '../StyleComponents/Button';
import { DATAEDIT_TITLES_COMPONENTS } from '../Company/StyleComponents';
import { ContentBlock } from '../Company/CompanyFormStyleComponents';
import LogoListItem from '../StyleComponents/LogoListItem';
import Pagination from '@/components/Pagination/Pagination';
import { MSG } from '@/constants/messages';
import { dataUpdateState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';
const Client = () => {
  const navigator = useNavigate();
  const [isEditing, setIsEditing] = useRecoilState(dataUpdateState);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const size = 6;
  const { data, isLoading, error } = useQuery<IClientPaginationData, Error>(['client', currentPage, size], () =>
    getClientPaginateData(currentPage - 1, size),
  );

  useEffect(() => {
    if (data) {
      setCurrentPage(data?.totalPages);
      navigator(`?page=${data?.totalPages}`);
    }
  }, [data && data.totalPages]);

  if (isLoading) return <>is Loading..</>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Wrapper>
      <ContentBlock>
        <TitleWrapper>
          {DATAEDIT_TITLES_COMPONENTS.Client}
          <Button
            description={MSG.BUTTON_MSG.ADD.CLIENT}
            svgComponent={<AddedIcon width={14} height={14} />}
            onClick={() => {
              navigator(`write?page=${currentPage}`);
              setIsEditing(true);
            }}
          />
        </TitleWrapper>
        <ListWrapper>
          {data?.content.length === 0 || data === null || data === undefined ? (
            <NoDataWrapper>😊 클라이언트 데이터가 존재하지 않습니다.</NoDataWrapper>
          ) : (
            <>
              {data &&
                data.content.length > 0 &&
                data.content.map((client) => (
                  <LogoListItem
                    logo={client.logoImg}
                    name={client.name}
                    is_posted={client.visibility}
                    onClick={() => {
                      setIsEditing(true);
                      navigator(
                        `${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}/${client.id}?page=${currentPage}`,
                      );
                    }}
                    svgComponent={client.visibility ? <PublicIcon /> : <PrivateIcon />}
                  />
                ))}
            </>
          )}
        </ListWrapper>

        <PaginationWrapper>
          {data && <Pagination postsPerPage={data.size} totalPosts={data.totalElements} paginate={setCurrentPage} />}
        </PaginationWrapper>
      </ContentBlock>
    </Wrapper>
  );
};

export default Client;

const Wrapper = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 17px;
`;

const ListWrapper = styled.div`
  height: 600px;
`;
const PaginationWrapper = styled.div`
  bottom: 10px;
`;
