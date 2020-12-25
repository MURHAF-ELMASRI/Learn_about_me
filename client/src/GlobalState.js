//create context to share user token
import react, { useState, useEffect } from 'react';
import axios from 'axios'

export const GlobalState = react.createContext();

export function StateProvider({ children }) {
    const [user, setUser] = useState({});
    
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
