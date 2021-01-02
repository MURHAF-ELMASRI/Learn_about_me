import axios from 'axios';
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
    Walk
} from './signupStyle';
import { useState } from 'react';
import avatarLogo from '../../util/undraw_male_avatar_323b.svg';
import walkLogo from './undraw_relaxing_walk_mljx.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';


const pageVar = {
    in: {
        opacity: 0,
    },
    animate: { opacity: 1, transition: { delay: 1.5 } },
    exit: { opacity: 0 },
};
const transition = { duration: 1.5, ease: [0.6, 0.1, -0.05, 1] };
const waveAnimate = {
    in: {
        x: 2300,
    },
    to: {
        x: -100,
    },
    exit: {
        x: -500,
        transition:{duration:1}
    },
};

const Wave = styled(motion.div)`
    position: fixed;
    background-color: #9c1de7;
    z-index: -10;
    height: 1000px;
    width: 1000px;
    border-radius: 50%;
    top: 0px;
    left: -500px;
`;

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userFocus, setUserFoucs] = useState(false);
    const [passFoucs, setPassFoucs] = useState(false);

    return (
        <>
            <Wave
                initial="in"
                exit="exit"
                animate="to"
                transition={transition}
                variants={waveAnimate}
            />

            <motion.div
                initial="in"
                animate="animate"
                exit="exit"
                variants={pageVar}
                
            >
                <Container>
                    <Walk>
                        <img src={walkLogo} alt="walk logo" />
                    </Walk>
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
                </Container>
            </motion.div>
        </>
    );
};

export default SignUp;
