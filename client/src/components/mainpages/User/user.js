import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import preLoader from './813.svg';
import { UserCont, ProfileImg, UserPage, LoaderContainer } from './userStyle';
import avatar from '../../util/undraw_male_avatar_323b.svg';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const sleep = async () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
};

const EditButton = styled(Link)`
    background-color: #581b98;
    color: white;
    padding: 1rem;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
`;

export default function User() {
    const [loading, setLoading] = useState(false);
    const { userId } = useParams();
    const [info, setInfo] = useState(''); //get the information from server and put here
    const { user } = useContext(GlobalState);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await sleep();
            await axios
                .get('http://localhost:4000/users/user', {
                    withCredentials: true,
                    params: {
                        userId,
                    },
                })
                .then((res) => {
                    setInfo(res.data);
                })
                .catch((err) => {
                    if (err.respond) setInfo({ msg: err.respond.msg });
                    else setInfo({ msg: err });
                });
            setLoading(false);
        };

        fetchData();
    }, [userId]);

    const showLoader = (
        <LoaderContainer>
            {!user && <img src={preLoader} alt="preloader" />}
        </LoaderContainer>
    );

    const showUser = (info) => {
        if (!info) return;
        if (info.msg) return <h1>Error fetching data</h1>;
        return (
            <UserCont initial={{ x: -200 }} animate={{ x: 0 }}>
                <h1>{info.userName}</h1>
                <p>Joined {info.createdAt}</p>
                <p>{info.bio}</p>
            </UserCont>
        );
    };

    return (
        <UserPage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {loading && showLoader}
            {info && (
                <ProfileImg
                    src={info.avatar ? info.avatar : avatar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    foundImg={info.avatar ? true : false}
                />
            )}
            {showUser(info)}
            {!loading && user && userId === user.id ? (
                <EditButton to="/edit">Edit</EditButton>
            ) : (
                ''
            )}
        </UserPage>
    );
}
