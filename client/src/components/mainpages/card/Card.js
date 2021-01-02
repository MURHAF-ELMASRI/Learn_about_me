import styled from 'styled-components';
// import {useState} from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Container = styled(motion.div)`
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px; ;
`;
const NameCont = styled(motion.div)`
    background-color: #9c1de7;
    width: 100%;
    text-align: center;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
`;

const Name = styled.h1`
    a {
        position: relative;
        color: whitesmoke;
        text-decoration: none;
        transition: 0.2s ease-in-out;
        &:hover {
            color: #faee1c;
        }
    }
`;

const Date = styled.h2``;
const Body = styled.p``;

export default function Card({ info, item }) {
    return (
        <Container variants={item}>
            <NameCont animate={{ width: '0% ' }} animate={{ width: '100% ' }} >
                
                <Name>
                    <Link to={`/user/${info._id}`}>{info.userName}</Link>
                </Name>
            </NameCont>
            <Date>{info.createdAt}</Date>
            <Body>{info.bio}</Body>
        </Container>
    );
}
