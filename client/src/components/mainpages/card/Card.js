import styled from 'styled-components';
// import {useState} from 'react'
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

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

const cardVar = {
    hidden: { opacity: 0, x: -100 },
};

export default function Card({ info }) {
    const [ref, inView] = useInView();
    const controls = useAnimation();
    useEffect(() => {
        if (inView)
            controls.start({
                opacity: 1,
                x: 0,
                transition:{delay:0.3,duration:.7}
            });
        
    }, [inView]);

    return (
        <Container
            variants={cardVar}
            ref={ref}
            animate={controls}
            initial="hidden"
        >
            <NameCont animate={{ width: '0% ' }} animate={{ width: '100% ' }}>
                <Name>
                    <Link to={`/user/${info._id}`}>{info.userName}</Link>
                </Name>
            </NameCont>
            <Date>{info.createdAt}</Date>
            <Body>{info.bio}</Body>
        </Container>
    );
}
