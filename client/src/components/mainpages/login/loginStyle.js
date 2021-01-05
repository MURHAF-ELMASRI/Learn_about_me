import styled from 'styled-components';

export const LoginPage = styled.div`
    width: 100%;
    height: 100%;
`;
export const Container = styled.div`
    padding: 0 3rem;
    position: relative;
    display: grid;
    width: 100%;
    height: 85vh;
    align-items: center;
    justify-content: end;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12rem;
    overflow: hidden;
`;

//logos

export const Walk = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    img {
        width: 400px;
    }
`;
export const LoginContent = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: flex-start;
`;
export const Form = styled.form`
    width: 320px;
`;
export const Avatar = styled.img`
    width: 100px;
`;
//component
export const Title = styled.h2`
    margin: 20px 0;
    text-transform: uppercase;
    font-size: 2.9rem;
`;
export const Div = styled.div`
    position: relative;
    height: 45px;
`;
export const InputDiv = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: 7% 93%;
    padding: 5px 0;
    margin: 25px 0;
    border-bottom: 2px solid #d9d9d9;
    ${(props) => (props.one ? 'margin-top:0;' : '')}
    ${(props) => (props.pass ? 'margin-bottom: 4px;' : '')}
    &::after,&::before {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: #faee1c;
        transition: 0.4s;
        ${(props) => (props.focus ? ' width: 50%;' : '')}
    }
    &::before {
        right: 50%;
    }
    &::after {
        left: 50%;
    }
`;
export const UserLogo = styled.div`
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
        transition: 0.3s;
        ${(props) => (props.focus ? 'color: #faee1c;' : '')}
    }
`;

export const Input = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
    font-family: 'poppins', sans-serif;
`;
export const H5 = styled.h5`
    position: absolute;
    color: #d9d9d9;
    left: 10px;
    font-size: 19px;
    transition: 0.3s;
    transform: translateY(-50%);
    transition: 0.3s;
    ${({ focus }) => (focus === true ? 'top:-30px;font-size:15px;' : '')}
`;

export const PassLogo = styled.div`
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 45px;
    i {
        transition: 0.3s;
        ${(props) => (props.focus ? 'color: #faee1c;' : '')}
    }
`;
export const ForgetPass = styled.a`
    display: block;
    text-align: right;
    text-decoration: none;
    font-weight: bold;
    color: #999;
    font-size: 0.9rem;
    transition: 0.3s;
    &:hover {
        color: #faee1c;
    }
`;

export const Btn = styled.button`
    width: 75%;
    border: none;
    margin: 1rem 0;
    color: white;
    font-size: 1.2rem;
    padding: 10px;
    border-radius: 30px;
    background-image: linear-gradient(to right, #faee1c, #ad1efa);
    transition: 0.3s;
    background-size: 200%;
    cursor: pointer;

    &:hover {
        background-position: right;
    }
`;
