import { useEffect, useState } from 'react';
import Card from '../card/Card'
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
            .get('')
            .then((data) => {
                setUsers(data.users);
            })
            .catch((err) => console.log(err));
    }, []);

    const CardContainer = styled.div`

    `

    function showUser() {
       return users.map(e => <Card info={e}/>)
        
    }

    return <CardContainer>
        {showUser()}
    </CardContainer>;
};

export default Home;
