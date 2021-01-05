import React, { useContext } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import ImageHolder from '../util/ImageHolder/ImageHoder';
import styled from 'styled-components';
import axios from 'axios';

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
    display: flex;
    column-gap:3rem;
    a {
        text-decoration: none;
        color: #faee1c;
    }
   ${(props) => (props.start ? 'margin-right:auto' : '')}
`;

const logout = (setUser) => {
    const config = {
        url: 'http://localhost:4000/logout',
        method: 'GET',
        withCredentials: true,
    };
    axios(config).then(res=>
        console.log('logged out')
    ).catch(err => console.log(err))
    
    setUser(null)
    localStorage.clear()
}

const toggleLogoutIn = (isLogged,setUser) => {
    return isLogged ? (
        <NavItem>
            <button onClick={()=>logout(setUser)}>Log out</button>
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
    const { user,setUser } = useContext(GlobalState);
    return (
        <Nav>
            <NavItem start={"true"}>
                <Link to="/">Home</Link>
                {user && <Link to={`/user/${user.id}`}>{user.userName}</Link>}
            </NavItem>
            {toggleLogoutIn(user?true:false,setUser)}
            <NavItem>
                {user && user.imgUrl && <ImageHolder imgUrl={user.imgUrl} />}
            </NavItem>
        </Nav>
    );
}
