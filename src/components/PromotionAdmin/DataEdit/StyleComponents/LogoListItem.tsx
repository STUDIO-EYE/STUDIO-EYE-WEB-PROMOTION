import styled from 'styled-components';

type LogoItemListType = {
  logo: string;
  name: string;
  is_posted: boolean;
  fontSize?: number;
  link?: string;
  onClick?: () => void;
  svgComponent?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const LogoItemList = (props: LogoItemListType) => {
  return (
    <LogoItemListStyle onClick={props.onClick} as={props.as}>
      <ContentWrapper>
        <ImgBox>
          <img src={props.logo} />
        </ImgBox>
        <InfoBox>
          <div data-cy="client_name"
            className='info_name'>{props.name}</div>
          {props.link && <div className='info_link'>{props.link}</div>}
        </InfoBox>
      </ContentWrapper>

      <SVGWrapper> {props.svgComponent}</SVGWrapper>
    </LogoItemListStyle>
  );
};

export default LogoItemList;

const LogoItemListStyle = styled.div<LogoItemListType>`
  cursor: pointer;
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px;' : '16px;')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  box-shadow: 2px 2px 5px 0.3px ${(props) => props.theme.color.black.pale};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImgBox = styled.div`
  margin-left: 10px;
  width: 180px;
  height: 80px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.background};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InfoBox = styled.div`
  margin-left: 20px;

  .info_name {
    font-family: ${(props) => props.theme.font.regular};
  }

  .info_link {
    margin-top: 10px;
    font-family: ${(props) => props.theme.font.light};
    font-size: 12px;
    color: #4b4b4b;
  }
`;

const SVGWrapper = styled.div`
  margin-right: 20px;
  margin-top: 20px;
  display: flex;
  align-self: flex-start;
`;
