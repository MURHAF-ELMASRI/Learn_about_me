import React, { useContext } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import ImageHolder from '../util/ImageHolder/ImageHoder';
import styled from 'styled-components';

const Nav = styled.header`
    position:relative;
    background-color: #581b98;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 5rem;
    justify-content: flex-end;
    align-items: center;
    z-index:100;
    box-shadow:0px 5px 20px 1px rgba(0,0,0,0.4) ;

`;
const NavItem = styled.div`
    font-size: 1.5rem;
    margin: 0.5rem;
    a {
        text-decoration: none;
        color: #faee1c;
    }
   ${(props) => (props.start ? 'margin-right:auto' : '')}
`;

const toggleLogoutIn = (isLogged) => {
    return isLogged ? (
        <NavItem>
            <Link to="/logout">logout</Link>
        </NavItem>
    ) : (
        <>
            <NavItem>
                <Link to="/login">login</Link>
            </NavItem>
            <NavItem>
                <Link to="/signup">signup</Link>
            </NavItem>
        </>
    );
};

export default function Header() {
    const { user } = useContext(GlobalState);
    console.log(user.imgUrl);
    return (
        <Nav>
            <NavItem start={"true"}>
                <Link to="/">Home</Link>
            </NavItem>
            {toggleLogoutIn(user.isLogged)}
            <NavItem>
                {user.isLogged && <ImageHolder imgUrl={user.imgUrl} />}
            </NavItem>
        </Nav>
    );
}
