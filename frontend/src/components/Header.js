import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Search from './Search';
import { logout } from '../actions/userActions';

import muffin from '../assets/svg/muffin.svg';
import basket from '../assets/svg/basket.svg';
import profile from '../assets/svg/profile.svg';

const Logo = styled.div`
  display: flex;
  align-items: center;
  .logo {
    background-image: url(${muffin});
    height: 1.5em;
    width: 1.5em;
    margin-right: 0.25em;
  }
`;

const NavLink = styled.div`
  display: flex;
  align-items: center;
  :before {
    display: inline-block;
    content: ' ';
    margin-right: 0.25em;
    height: 1em;
    width: 1em;
    ${(props) =>
      props.basket &&
      css`
        mask: url(${basket});
        background-color: rgba(255, 255, 255, 0.5);
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-origin: content-box;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
        -webkit-mask-origin: content-box;
      `}
    ${(props) =>
      props.profile &&
      css`
        mask: url(${profile});
        background-color: rgba(255, 255, 255, 0.5);
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-origin: content-box;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
        -webkit-mask-origin: content-box;
      `}
  }
  :hover:before {
    background-color: #fff;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <header style={{ width: '100vw' }}>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Logo>
                <div className='logo'></div>
                <span>Sweet and Sour</span>
              </Logo>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Search />
            <Nav className='ml-auto'>
              <LinkContainer to='/basket'>
                <Nav.Link>
                  {/* <i className='fas fa-shopping-basket'></i> Basket */}
                  <NavLink basket='true'>Basket</NavLink>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <NavLink profile='true'> Sign In</NavLink>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='admin'>
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
