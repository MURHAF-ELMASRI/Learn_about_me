import React from 'react';
import {StateProvider} from './GlobalState'
import { BrowserRouter } from "react-router-dom";
import Header from './components/header/header';
import MainPages from './components/mainpages/pages';
//import styled from 'styled-components';

const App = () => {
    return (
        <StateProvider>
            <BrowserRouter>
                <Header />
            <MainPages/>
            </BrowserRouter>
        </StateProvider>
    );
};

export default App;
