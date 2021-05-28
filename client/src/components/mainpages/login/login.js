// import axios from 'axios';
import React, { useState, useContext} from 'react';
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
    LoginPage,
} from './loginStyle';
import parkImg from './undraw_amusement_park_17oe.svg';
import avatarLogo from '../../util/undraw_male_avatar_323b.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import {Redirect} from 'react-router-dom'
//Animated component
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

//Animation props
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
        opacity: 0,
    },
};

const Park = styled(motion.div)`
    position: relative;
    width: 75%;
`;
//Main component

export default function LogInPage() {
    const { setUser } = useContext(GlobalState);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userFocus, setUserFoucs] = useState(false);
    const [passFoucs, setPassFoucs] = useState(false);
    const [redirect,setRedirect]=useState(false)
    const LogIn = (e, userName, password) => {
        e.preventDefault();
        console.log({ userName, password });
        const config = {
            url: 'http://localhost:4000/login',
            method: 'POST',
            data: { userName: userName, password:password},
            withCredentials: true,
            
        };
        
        axios(config)
            .then((res) => {
                const user = res.data.user
                alert("succeeded")
                setUser(user)
                setRedirect(true)
            })
            .catch((err) => {
                if (err.response) alert(err.response.data.msg) 
                else alert(err)
            });
    };

    return (
        <>
        {redirect&& <Redirect to="./"/>}
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
                            <Form
                                onSubmit={(e) => LogIn(e, userName, password)}
                            >
                                <Avatar src={avatarLogo} />
                                <Title>welcome</Title>
                                <InputDiv one focus={userFocus}>
                                    <UserLogo focus={userFocus}>
                                        <i className="fas fa-user"></i>
                                    </UserLogo>
                                    <Div>
                                        <H5 focus={userFocus}>User Name</H5>
                                        <Input
                                            name="userName"
                                            type="text"
                                            value={userName}
                                            onChange={(e) => {
                                                setUserName(e.target.value);
                                                
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
                                        <i className="fas fa-lock"></i>
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
                                <Btn>Log in</Btn>
                            </Form>
                        </LoginContent>
                    </motion.div>
                </Container>
            </motion.div>
            </LoginPage>
            </>
    );
}

