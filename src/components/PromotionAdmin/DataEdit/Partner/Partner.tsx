import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getPartnersData } from '@/apis/PromotionAdmin/dataEdit';
import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import { IPartnersData } from '@/types/PromotionAdmin/dataEdit';

import { ReactComponent as AddedIcon } from '@/assets/images/PA/plusIcon.svg';
import { ReactComponent as PublicIcon } from '@/assets/images/PA/public.svg';
import { ReactComponent as PrivateIcon } from '@/assets/images/PA/private.svg';

import { DATAEDIT_TITLES_COMPONENTS } from '../Company/StyleComponents';
import { ContentBlock } from '../Company/CompanyFormStyleComponents';
import Button from '../StyleComponents/Button';
import LogoItemList from '../StyleComponents/LogoListItem';

const Partner = () => {
  const { data, isLoading, error } = useQuery<IPartnersData[], Error>(['partners', 'id'], getPartnersData);
  const navigator = useNavigate();

  if (isLoading) return <>is Loading..</>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Wrapper>
      <ContentBlock>
        <TitleWrapper>
          {DATAEDIT_TITLES_COMPONENTS.Partner}
          <Button
            description='Add New Partner'
            svgComponent={<AddedIcon width={14} height={14} />}
            onClick={() => {
              navigator(`write`);
            }}
          />
        </TitleWrapper>

        {data?.length === 0 || data === null ? (
          <NoDataWrapper>😊 파트너 데이터가 존재하지 않습니다.</NoDataWrapper>
        ) : (
          <ListWrapper>
            {data?.map((partner) => (
              <LogoItemList
                logo={partner.logoImg}
                name={partner.partnerInfo.name}
                link={partner.partnerInfo.link}
                is_posted={partner.partnerInfo.is_main}
                onClick={() =>
                  navigator(`${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_PARTNER}/${partner.partnerInfo.id}`)
                }
                svgComponent={partner.partnerInfo.is_main ? <PublicIcon /> : <PrivateIcon />}
              />
            ))}
          </ListWrapper>
        )}
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
  font-family: 'pretendard-medium';
  font-size: 17px;
`;
const ListWrapper = styled.div``;
