// import axios from 'axios';
import * as React from 'react';
import {
    LoginContent,
    Form,
    Avatar,
    Title,
    Div,
    InputDiv,
    UserLogo,
    Input,
    H5,
    PassLogo,
    Btn,
    Container,
} from './loginStyle';
import { useState } from 'react';
import parkImg from './undraw_amusement_park_17oe.svg';
import avatarLogo from '../../util/undraw_male_avatar_323b.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wave = styled(motion.div)`
    position: fixed;
    background-color: #9c1de7;
    z-index: -10;
    height: 1000px;
    width: 1000px;
    border-radius: 50%;
    top: 0px;
    left: -1000px;
`;

const LoginPage = styled.div`
    width: 100%;
    height: 100%;
`;
const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 1] };
const waveVar = {
    animate: {
        x: 1700,
    },
    exit: {
        x: 2500,
    },
    transition: transition,
};

const loginContainerVar = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: { delay: 1, ...transition },
    },
    animatePark: {
        opacity: 1,
        transition: { delay: 1.5, ...transition },
    },
    exit: {
        opacity:0
    }
};

const Park = styled(motion.div)`
    position: relative;
    width: 75%;
`;

const LogIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userFocus, setUserFoucs] = useState(false);
    const [passFoucs, setPassFoucs] = useState(false);
    return (
        <LoginPage>
            <Wave
                animate="animate"
                variants={waveVar}
                exit="exit"
                transition={transition}
            />
            <motion.div initial="initial" exit="exit" animate="animate">
                <Container>
                    <Park
                        variants={loginContainerVar}
                        initial="initial"
                        exit="exit"
                        animate="animatePark"
                    >
                        <img
                            style={{ width: '100%' }}
                            src={parkImg}
                            alt="park"
                        />
                    </Park>
                    <motion.div variants={loginContainerVar}>
                        <LoginContent>
                            <Form method="post">
                                <Avatar src={avatarLogo} />
                                <Title>welcome</Title>
                                <InputDiv one focus={userFocus}>
                                    <UserLogo focus={userFocus}>
                                        <i class="fas fa-user"></i>
                                    </UserLogo>
                                    <Div>
                                        <H5 focus={userFocus}>User Name</H5>
                                        <Input
                                            name="userName"
                                            type="text"
                                            value={userName}
                                            onChange={(e) => {
                                                setUserName(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            onFocus={() => setUserFoucs(true)}
                                            onBlur={() =>
                                                userName === ''
                                                    ? setUserFoucs(false)
                                                    : {}
                                            }
                                        />
                                    </Div>
                                </InputDiv>
                                <InputDiv pass focus={passFoucs}>
                                    <PassLogo focus={passFoucs}>
                                        <i class="fas fa-lock"></i>
                                    </PassLogo>
                                    <Div>
                                        <H5 focus={passFoucs}>Password</H5>

                                        <Input
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            onFocus={() => setPassFoucs(true)}
                                            onBlur={() =>
                                                password === ''
                                                    ? setPassFoucs(false)
                                                    : {}
                                            }
                                        />
                                    </Div>
                                </InputDiv>
                                <Btn>SIGN UP</Btn>
                            </Form>
                        </LoginContent>
                    </motion.div>
                </Container>
            </motion.div>
        </LoginPage>
    );
};

export default LogIn;
