import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import EditPic from './EditPic';
import preLoader from './813.svg';
import {
    StyleButton,
    UserContainer,
    ProfileImg,
    UserPage,
    LoaderContainer,
} from './userStyle';
import avatar from '../../util/undraw_male_avatar_323b.svg';
import { GlobalState } from '../../../GlobalState';
import styled from 'styled-components';



const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
`;
// utility function
const showLoader = (
    <LoaderContainer>
        <img src={preLoader} alt="preLoader" />
    </LoaderContainer>
);


//User Component

const User = ({ user ,info, setInfo }) => {
    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };
    return (
        <UserContainer initial={{ x: -200 }} animate={{ x: 0 }}>
            <Form>
                <InputContainer>
                    <label>User Name</label>
                    <input
                        name="userName"
                        type="text"
                        value={info.userName}
                        onChange={(e) => handleChange(e)}
                    />
                </InputContainer>
                <InputContainer>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={info.password}
                        onChange={(e) => handleChange(e)}
                    />
                </InputContainer>
                <InputContainer>
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={info.bio}
                        onChange={(e) => handleChange(e)}
                    />
                </InputContainer>
            </Form>
        </UserContainer>
    );
};
//main component
export default function Edit() {
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(GlobalState);
    const [info, setInfo] = useState({userName:'',password:'', bio:''});
    const [editPanal, setEditPanal] = useState(false);

    useEffect(() => setInfo(user), [user]); 

    const confirm = () => {
        const formData = new FormData()
        setLoading(true)
        
        const { userName, password, bio, avatar } = info;
        formData.append(
            'avatar',
            avatar
        );
        console.log('formdata  '+{formData});
        const config = {
            url: 'http://localhost:4000/edit',
            method: 'POST',
            data: {userName,password,bio,avatar},
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        console.log(info)
        axios(config)
            .then((res) => {
                const user = res.data.user;
                alert("information has been edited")
                setUser(user)
                window.location.href = '/';
            })
            .catch((err) => {
                if (err.response) alert(err.response.data.msg)
                else alert(err)
            }).finally(setLoading(false));
    }


    return (
        <UserPage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {loading && showLoader}
            {user && (
                <ProfileImg
                    src={info.avatar ? info.avatar instanceof Blob?URL.createObjectURL(info.avatar):info.avatar : avatar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    foundImg={user.imgUrl ? true : false}//If there is profile img then set shadow to it
                />
            )}
            <StyleButton onClick={()=>confirm()}>Confirm</StyleButton>

            <User user={user} info={info} setInfo={setInfo} />
            <StyleButton
                style={styleEditPic}
                onClick={() => setEditPanal(!editPanal)}
            >
                edit pic
            </StyleButton>
            {editPanal && (
                <EditPic setInfo={setInfo} setEditPanal={setEditPanal} />
            )}
        </UserPage>
    );
}

const styleEditPic = {
    width: '5rem',
    alignSelf: 'flex-end',
    position: 'relative',
    right: '450px',
};
