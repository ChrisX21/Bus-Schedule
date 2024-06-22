import React from 'react';
import { FaBus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
          'X-Authorization': localStorage.getItem('token')
        }
      });

      if (response.status === 204) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <NavbarContainer>
      <HomeLink to="/">
        <h1>Bus Schedule</h1>
        <FaBus />
      </HomeLink>
      <NavbarOptions>
        {isLoggedIn ? (
          <>
            <CenteredDiv>
              <NavButton to="/Station/New">Create Bus Station</NavButton>
            </CenteredDiv>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavButton to="/login">Login</NavButton>
            <NavButton to="/register">Register</NavButton>
          </>
        )}
      </NavbarOptions>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #282c34;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  svg {
    margin-left: 0.5rem;
    font-size: 1.5rem;
  }
`;

const NavbarOptions = styled.div`
  display: flex;
  align-items: center;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const NavButton = styled(Link)`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #282c34;
  background-color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #61dafb;
  }
`;

const LogoutButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #282c34;
  background-color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: red;
  }
`;

export default Navbar;
