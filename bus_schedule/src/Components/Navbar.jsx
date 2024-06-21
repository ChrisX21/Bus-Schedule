import React from 'react';
import { FaBus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Navbar({ isLoggedIn }) {
    return (
        <NavbarContainer>
            <HomeLink to="/">
                <h1>Bus Schedule</h1>
                <FaBus />
            </HomeLink>
            <NavbarOptions>
                {isLoggedIn ? (
                    <NavButton to="/logout">Logout</NavButton>
                ) : (
                    <>
                        <NavButton to="/login">Login</NavButton>
                        <NavButton to="/register">Register</NavButton>
                    </>
                )}
                {isLoggedIn && <NavButton to="/create-new-bus">Create New Bus</NavButton>}
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


export default Navbar;
