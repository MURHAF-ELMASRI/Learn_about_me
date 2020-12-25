import { useEffect, useState } from 'react';
import Card from '../card/Card';
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('/')
            .then((res) => {
                console.log(res.body);
            })
            .catch((err) => console.log(err));
    }, []);

    const CardContainer = styled.div``;

    function showUser(users) {
        return users.map((e) => <Card info={e} />);
    }

    return <CardContainer>{showUser(users)}</CardContainer>;
};

export default Home;
