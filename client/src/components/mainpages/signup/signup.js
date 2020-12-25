import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const Container = styled.div`
        display: grid;
        grid-template-columns: auto minmax(100px, 400px) auto;
        grid-template-rows: auto minmax(100px, 400px) auto;
    `;

    const Wave = styel.img`

`;

    const Form = styled.form``;
    const Avatar = styled.div``;
    const Title = styled.h2``;
    const InputCont = style.div``;
    const UserLogo = styled.img``;
    const Input = styled.input`
        display: block;
    `;
    const PassLogo = styled.img``;

    return (
        <Container>
            <Wave />
            <Form method="post">
                <Avatar />
                <Title />
                <InputCont>
                    <UserLogo>
                        <i class="fas fa-user"></i>
                    </UserLogo>
                    <Input name="userName" value={userName} />
                </InputCont>
                <InputCont>
                    <PassLogo>
                        <i class="fas fa-lock"></i>
                    </PassLogo>
                    <Input name="password" type="password" value={password} />
                </InputCont>
            </Form>
        </Container>
    );
};

export default SignUp;
