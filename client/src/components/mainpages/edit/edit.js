import { useState,useContext } from 'react';
import axios from 'axios';
import preLoader from './813.svg';
import { UserCont, ProfileImg, UserPage, LoaderContainer } from './userStyle';
import avatar from '../../util/undraw_male_avatar_323b.svg';
import { GlobalState } from '../../../GlobalState';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import { Div } from '../login/loginStyle';
const sleep = async () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
};

const Form = styled.form`
    display:flex;
    flex-direction:column;
    row-gap:3rem;
    border:2px solid gray;
`

// utility function
const showLoader = (
    <LoaderContainer>
        <img src={preLoader} alt="Profile photo" />
    </LoaderContainer>
);


// utility function
const showUser = (user,props) => {
    if (!user) return
    if (user.msg) return <h1>Error fetching data</h1>;
    console.log(user)
};
//User Component
        
const User=({info,setInfo})=>{
    
    const InputContainer = ({ title, value, name }) => {
        const handleChange = (e) => {
            const inputName = e.target.name
            const value=e.target.value
            setInfo({
                [inputName]:value
            })
        }
        return (
            <div>
                <title>{title}</title>
                <input name={name} type='text' value={value} onChange={(e)=>handleChange(e)} />
            </div>
        )
    }
        return(
          <UserCont initial={{ x: -200 }} animate={{ x: 0 }}>
            <Form>
                    <InputContainer name={'userName'} value={info.useName} title="User Name"/>
                    <InputContainer name={'password'} value={info.password} title="Password"/>
                    <InputContainer name={'bio'} value={info.bio} title="Bio"/>
            </Form>
        </UserCont>
        )
                
}
 //main component
export default function Edit() {
    const [loading, setLoading] = useState(false);
    const {user,setUser}=useContext(GlobalState)
    const [info, setInfo] = useState({ ...user })
    return (
        <UserPage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {loading && showLoader}
            {user?(
                <ProfileImg
                    src={user.imgUrl ? user.imgUrl : avatar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    foundImg={user.imgUrl ? true : false}
                />
            ):<Redirect to={"/"}/>}
            <User info={info} setInfo={setInfo} />
        </UserPage>
    );
}

