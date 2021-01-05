//create context to share user token
import react, { useState, useEffect } from 'react';
import axios from 'axios'

export const GlobalState = react.createContext();

export function StateProvider({ children }) {
    const [user, setUser] = useState();
    
    useEffect(() => {
        if (localStorage.id) {
            axios.get(`http://localhost:4000/users/user`, {
                params: {
                    id:localStorage.id
                }
            })
                .then(res => {
                
                  setUser(res.data.user)
                })
                .catch(
                    (err) => console.log(err)
                )
        }
    }, []);

    return <GlobalState.Provider value={{ user: user, setUser: setUser } }>{children}</GlobalState.Provider>;
}
