import {useEffect,useState} from 'react';
import Card from '../card/Card';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const CardContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 10px;
    width: 50%;
    margin: 100px auto;
`;

function showUser(users) {
    if (!users) return;
    var temp = users.map((e) => {
        return <Card key={e._id} info={e} />;
    });

    const cardVarinats = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.4 } },
        exit: { opacity: 0 },
    };

    return (
        <CardContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={cardVarinats}
        >
            {temp}
        </CardContainer>
    );
}

export default function Home ()  {
    const [users, setUsers] = useState();

    useEffect(() => {
        axios
            .get('http://localhost:4000/users', { withCredentials: true })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return <div>{showUser(users)}</div>;
};

