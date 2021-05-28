import axios from 'axios';
import React,{useState,useContext} from 'react';
import { GlobalState } from "../../../GlobalState";

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
import avatarLogo from '../../util/undraw_male_avatar_323b.svg';
import walkLogo from './undraw_relaxing_walk_mljx.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// const port = 4000; //port used by the server

const sendData = async (event, userName, password,setUser) => {
    var data = {
        userName: userName,
        password: password,
    };
    event.preventDefault();
    await axios
        .post('http://localhost:4000/signup', data,{withCredentials:true})
        .then((res) => {
            const user = res.data.user
            console.log(user)
            setUser(user)
            window.location.href = '/edit';
        })
        .catch((err) => alert(err));
};

//Initialze Animation rul for framer motion

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
        transition: { duration: 1 },
    },
};
// style Element used in Animation
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
//Main Component ---------------------
export default function SignUp  (){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userFocus, setUserFoucs] = useState(false);
    const [passFoucs, setPassFoucs] = useState(false);
    const { setUser } = useContext(GlobalState);
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
                        <Form
                            method="post"
                            onSubmit={(event) =>
                                sendData(event, userName, password,setUser)
                            }
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
                            <Btn>SIGN UP</Btn>
                        </Form>
                    </LoginContent>
                </Container>
            </motion.div>
        </>
    );
};

