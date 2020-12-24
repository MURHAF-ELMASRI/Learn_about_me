import axios from 'axios';
import styled from 'styled-components'
const signUp = () => {
    const Container = styled.div`
        display:grid;
        grid-template-columns:minmax(100px,300px) 1fr minmax(100px,300px) ;
        grid-template-rows:100px 1fr 1fr ;
        grid-template-areas:
        'a a a'
        'a b a'
        'a a a';
    `;

    const LoginContainer = styled.div`
        border:#404040 solid 2px;
        width:100%;

    `


    return (
        <Container>
            <LoginContainer>
                hi
            </LoginContainer>
        </Container>

    );
};

export default signUp;
