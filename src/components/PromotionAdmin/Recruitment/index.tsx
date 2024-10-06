import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import styled from 'styled-components';
import NavBtn from './NavBtn';

const linksData = [
  {
    path: `${PA_ROUTES.RECRUITMENT}/manage`,
    pathName: 'Recruitment',
  },
  {
    path: `${PA_ROUTES.RECRUITMENT}/benefit/manage`,
    pathName: 'Benefit',
  },
];

function DetailNavigator() {
  return (
    <Wrapper>
      <SideBar>
        {linksData.map((link, index) => (
          <NavBtn key={index} path={link.path} pathName={link.pathName} />
        ))}
      </SideBar>
    </Wrapper>
  );
}

export default DetailNavigator;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.color.white.light};
  position: fixed;
  left: 120px;
  width: 100%;
  top: 80px;
  z-index: 2;
`;

const SideBar = styled.div`
  display: flex;
  width: 100%;
`;
