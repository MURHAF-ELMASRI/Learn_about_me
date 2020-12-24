//create context to share user token
import react, { useState, useEffect } from 'react';
import axios from 'axios'

export const GlobalState = react.createContext();

export function StateProvider({ children }) {
    const [user, setUser] = useState({
        isLogged: true,
        id: 233,
        username: 'Neil',
        name: 'armstrong',
        submitDate: '1950',
        bio: 'only Astronaut wen to the moon',
        imgUrl:
            'https://images.unsplash.com/photo-1527082395-e939b847da0d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80',
    });
    
    useEffect(() => {
        axios.get('/user')
            .then(data => {
                console.log(data.json);
            })
            .catch(
                (err)=> console.log(err)
            )
        
    }, []);

    return <GlobalState.Provider value={{ user: user, setUser: setUser } }>{children}</GlobalState.Provider>;
}
