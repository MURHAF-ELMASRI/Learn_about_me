import { useEffect, useState } from 'react';
import Card from '../card/Card';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';



const item = {
    hidden: { opacity: 0,x:-200 },
    show: { opacity: 1,x:0 },
};
const cardVar = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
        },
    },
    exit:{opacity:0}
};


const CardContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 10px;
    width: 50%;
    margin: 100px auto;
`;

function showUser(users) {
    if (!users)
        return
    var temp = users.map((e) => <Card item={item} key={e._id} info={e} />);
    
    return (
        <CardContainer
                variants={cardVar}
                initial="hidden"
                animate="show"
            exit="exit"
        >
            {temp}
        </CardContainer>
    )
        

}


const Home = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        axios
            .get('http://localhost:4000/users')
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {showUser(users)}
        </>
    );
};

export default Home;
