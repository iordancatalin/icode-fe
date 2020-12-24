import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../core/contexts/AuthContext';
import { AUTHENTICATE_STATUS } from '../../core/reducers/auth-reducer';
import AuthenticatedUser from './AuthenticatedUser';
import NavBarLink from './NavBarLink';

const NavigationBar = styled.nav.attrs(() => ({
  className: 'h-100',
}))`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  border-right: 2px solid ${({ theme }) => theme.accent};
`;

const NavBarSection = styled.section`
  flex: 1;
`;

const NavBarIcon = ({ icon }) => (
  <FontAwesomeIcon icon={icon} size='lg'></FontAwesomeIcon>
);

const SgnInNavBarLink = styled(NavBarLink)`
  background-color: ${({ theme }) => theme.signInLink};
`;

const createUserSectionForUnAuthUser = () => (
  <SgnInNavBarLink to='/auth/sign-in'>
    <NavBarIcon icon='user'></NavBarIcon>
  </SgnInNavBarLink>
);

export default function NavBarComponent() {
  const [auth] = useContext(AuthContext);

  const userAuth = auth?.status === AUTHENTICATE_STATUS;

  const userSection = userAuth ? (
    <AuthenticatedUser />
  ) : (
    createUserSectionForUnAuthUser()
  );

  return (
    <NavigationBar>
      <NavBarSection>
        <NavBarLink to='/kode/development'>
          <NavBarIcon icon='code'></NavBarIcon>
        </NavBarLink>
      </NavBarSection>
      <NavBarSection>
        <NavBarLink to='/kode/my-projects' disabled={!userAuth}>
          <NavBarIcon icon='home'></NavBarIcon>
        </NavBarLink>
        <NavBarLink to='/kode/shared-projects' disabled={!userAuth}>
          <NavBarIcon icon='share-alt'></NavBarIcon>
        </NavBarLink>
        <NavBarLink to='/kode/settings' disabled={!userAuth}>
          <NavBarIcon icon='cog'></NavBarIcon>
        </NavBarLink>
      </NavBarSection>
      <NavBarSection className='d-flex flex-column justify-content-end'>
        {userSection}
      </NavBarSection>
    </NavigationBar>
  );
}
