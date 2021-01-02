import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import preLoader from './813.svg';
import styled from 'styled-components';
const sleep = async () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
};

const UserCont = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ProfileImg = styled.img`
    width: 200px;
`;
const UserPage = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 200px;
`;
export default function User() {
    const [loading, setLoading] = useState(false);
    const { userId } = useParams();
    const [info, setInfo] = useState();

    console.log(userId);

    useEffect(() => { fetchData() }, []);
    
    const fetchData = async () => {
        setLoading(true);
        await sleep();
        await axios
            .get('http://localhost:4000/users/user', {
                params: {
                    id: userId,
                },
            })
            .then((res) => setInfo(...res.data))
            .catch((err) => {
                if (err.respond) setInfo({ msg: err.respond.msg });
                else setInfo({ msg: err});
            });
        setLoading(false);
    };

    const showLoader = (
        <LoaderContainer>
            <img src={preLoader} alt='Profile photo' />
        </LoaderContainer>
    );

    const showUser = (info) => {
        if (!info)
            return;
        if (info.msg) return <h1>Error fetching data</h1>;
        console.log(info);
        return (
            <UserCont>
                <ProfileImg src={info.imgUrl} />
                <h1>{info.userName}</h1>
                <p>Joined {info.createdAt}</p>
                <p>{info.bio}</p>
            </UserCont>
        );
    };

    return (
        <UserPage exit={{ opacity: 0 }}>
            {loading && showLoader}
            {showUser(info)}
        </UserPage>
    );
}
