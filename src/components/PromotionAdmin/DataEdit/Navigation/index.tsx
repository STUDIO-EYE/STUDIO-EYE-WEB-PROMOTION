import { PA_ROUTES, PA_ROUTES_CHILD } from '@/constants/routerConstants';
import styled from 'styled-components';
import NavBtn from './NavBtn';

const linksData = [
  {
    path: `${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CEO}`,
    pathName: 'CEO',
  },
  {
    path: `${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_COMPANY}`,
    pathName: 'Company',
  },
  {
    path: `${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_PARTNER}`,
    pathName: 'Partner',
  },
  {
    path: `${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_CLIENT}`,
    pathName: 'Client',
  },
  {
    path: `${PA_ROUTES.DATA_EDIT}/${PA_ROUTES_CHILD.DATA_EDIT_MENU}`,
    pathName: 'Menu',
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
