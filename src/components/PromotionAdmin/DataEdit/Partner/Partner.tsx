import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPartnerPaginateData } from '@/apis/PromotionAdmin/dataEdit';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IPartnerPaginationData } from '@/types/PromotionAdmin/dataEdit';
import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import { ReactComponent as PublicIcon } from '@/assets/images/PA/public.svg';
import { ReactComponent as PrivateIcon } from '@/assets/images/PA/private.svg';
import { DATAEDIT_TITLES_COMPONENTS } from '../Company/StyleComponents';
import { ContentBlock } from '../Company/CompanyFormStyleComponents';
import Button from '../StyleComponents/Button';
import LogoItemList from '../StyleComponents/LogoListItem';
import Pagination from '@/components/Pagination/Pagination';
import { MSG } from '@/constants/messages';
import { dataUpdateState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';

const Partner = () => {
  const navigator = useNavigate();
  const [isEditing, setIsEditing] = useRecoilState(dataUpdateState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const size = 6;
  const { data, isLoading, error } = useQuery<IPartnerPaginationData, Error>(
    ['partner', currentPage, size],
    () => getPartnerPaginateData(currentPage - 1, size),
    {
      keepPreviousData: true, // 이전 데이터를 유지하면서 새로운 데이터를 로드
      onSuccess: () => setIsTransitioning(false), // 전환 완료 시 상태 초기화
    },
  );

  useEffect(() => {
    if (data?.totalPages == 0) return;
    if (data) {
      // 현재 페이지가 총 페이지 수보다 크면 마지막 페이지로 이동
      if (currentPage > data.totalPages) {
        setCurrentPage(data.totalPages);
        navigator(`?page=${data.totalPages}`);
      }
    }
  }, [data, currentPage, navigator]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === currentPage) return; // 동일 페이지로 이동 방지
    setIsTransitioning(true); // 전환 상태 활성화
    setCurrentPage(pageNumber);
    navigator(`?page=${pageNumber}`);
  };

  if (isLoading) return <>is Loading..</>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Wrapper>
      <ContentBlock>
        <TitleWrapper>
          {DATAEDIT_TITLES_COMPONENTS.Partner}
          <Button
            description={MSG.BUTTON_MSG.ADD.PARTNER}
            svgComponent={<AddedIcon width={14} height={14} />}
            onClick={() => {
              navigator(`write?page=${currentPage}`);
            }}
          />
        </TitleWrapper>

        {data?.content.length === 0 || data === null ? (
          <NoDataWrapper>😊 파트너 데이터가 존재하지 않습니다.</NoDataWrapper>
        ) : (
          <ListWrapper>
            {data &&
              data.content.length > 0 &&
              data.content.map((partner, index) => (
                <React.Fragment key={`${partner.id}-${index}`}>
                  <LogoItemList
                    data-cy={`partner-item-${index}`}
                    logo={partner.logoImageUrl}
                    name={partner.name}
                    link={partner.link}
                    is_posted={partner.isMain}
                    onClick={() => {
                      if (isEditing && !window.confirm(MSG.CONFIRM_MSG.DATA_EDIT.EXIT)) {
                        return;
                      } else {
                        setIsEditing(false);
                      }
                      navigator(
                        `${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_PARTNER}/${partner.id}?page=${currentPage}`,
                      );
                    }}
                    svgComponent={partner.isMain ? <PublicIcon /> : <PrivateIcon />}
                  />
                </React.Fragment>
              ))}
          </ListWrapper>
        )}
        <PaginationWrapper>
          {data && <Pagination postsPerPage={data.size} totalPosts={data.totalElements} paginate={handlePageChange} />}
        </PaginationWrapper>
      </ContentBlock>
    </Wrapper>
  );
};

export default Partner;

const Wrapper = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
`;

const NoDataWrapper = styled.div`
  font-size: 17px;
`;
const ListWrapper = styled.div`
  height: 600px;
`;

const PaginationWrapper = styled.div`
  bottom: 10px;
`;
