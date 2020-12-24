import ReactDom from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './GlobalStyle';
ReactDom.render(
    <BrowserRouter>
        <App />
        <GlobalStyles/>
    </BrowserRouter>,
    document.getElementById('root')
);
