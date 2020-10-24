import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import AuthenticatedUser from './AuthenticatedUser';
import NavBarLink from './NavBarLink';

const NavigationBar = styled.nav.attrs(() => ({
  className: 'h-100',
}))`
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  border-right: 2px solid #dd5c71;
`;

const NavBarSection = styled.section`
  flex: 1;
`;

const NavBarIcon = ({ icon }) => (
  <FontAwesomeIcon icon={icon} size='lg'></FontAwesomeIcon>
);

const createUserSectionForUnAuthUser = () => (
  <NavBarLink className='bg-secondary' to='/sign-in'>
    <NavBarIcon icon='user'></NavBarIcon>
  </NavBarLink>
);

const userAuth = false;

export default function NavBarComponent() {
  const userSection = userAuth ? (
    <AuthenticatedUser />
  ) : (
    createUserSectionForUnAuthUser()
  );

  return (
    <NavigationBar>
      <NavBarSection>
        <NavBarLink to='/'>
          <NavBarIcon icon='code'></NavBarIcon>
        </NavBarLink>
      </NavBarSection>
      <NavBarSection>
        <NavBarLink to='/home' disabled={!userAuth}>
          <NavBarIcon icon='home'></NavBarIcon>
        </NavBarLink>
        <NavBarLink to='/shared' disabled={!userAuth}>
          <NavBarIcon icon='share-alt'></NavBarIcon>
        </NavBarLink>
        <NavBarLink to='/assets' disabled={!userAuth}>
          <NavBarIcon icon='folder'></NavBarIcon>
        </NavBarLink>
        <NavBarLink to='/settings' disabled={!userAuth}>
          <NavBarIcon icon='cog'></NavBarIcon>
        </NavBarLink>
      </NavBarSection>
      <NavBarSection className='d-flex flex-column justify-content-end'>
        {userSection}
      </NavBarSection>
    </NavigationBar>
  );
}
