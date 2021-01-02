import reactDom from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './GlobalStyle';

reactDom.render(
    <BrowserRouter>
        <App />
        <GlobalStyles/>
    </BrowserRouter>,
    document.getElementById('root')
);
