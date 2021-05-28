import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import avatar from '../../util/undraw_male_avatar_323b.svg';
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
const Img = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.4);
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
                transition: { delay: 0.3, duration: 0.7 },
            });
    }, [inView, controls]);

    return (
        <Container
            variants={cardVar}
            ref={ref}
            animate={controls}
            initial="hidden"
        >
            <NameCont initial={{ width: '0% ' }} animate={{ width: '100% ' }}>
                <Img src={info.avatar ? info.avatar : avatar} alt="userImage" />
                <Name>
                    <Link to={`/user/${info._id}`}>{info.userName}</Link>
                </Name>
            </NameCont>
            <Date>
                {new window.Date(info.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </Date>
            <Body>{info.bio}</Body>
        </Container>
    );
}
