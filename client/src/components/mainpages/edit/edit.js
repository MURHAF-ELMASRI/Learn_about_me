import { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import preLoader from './813.svg';
import { UserCont, ProfileImg, UserPage, LoaderContainer } from './userStyle';
import avatar from '../../util/undraw_male_avatar_323b.svg';
import { GlobalState } from '../../../GlobalState';

const sleep = async () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
};
// utility function
const showLoader = (
    <LoaderContainer>
        <img src={preLoader} alt="Profile photo" />
    </LoaderContainer>
);
// utility function

const showUser = (info) => {
    if (!info) return;
    if (info.msg) return <h1>Error fetching data</h1>;
    console.log(info);
    return (
        <UserCont initial={{ x: -200 }} animate={{ x: 0 }}>
            <h1>{info.userName}</h1>
            <p>Joined {info.createdAt}</p>
            <p>{info.bio}</p>
        </UserCont>
    );
};
//User Component
export default function User() {
    const [loading, setLoading] = useState(false);
    const { userId } = useParams();
    const [info, setInfo] = useState();
    const {id}=useContext(GlobalState)
    console.log(userId);

    useEffect(() => {
        fetchData();
    }, []);

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
                else setInfo({ msg: err });
            });
        setLoading(false);
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
                    src={info.imgUrl ? info.imgUrl : avatar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    foundImg={info.imgUrl ? true : false}
                />
            )}
            {showUser(info)}
        </UserPage>
    );
}
