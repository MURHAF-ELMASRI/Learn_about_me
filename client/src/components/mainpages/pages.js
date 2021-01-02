import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './home/Home';
import Signup from './signup/signup';
import Login from './login/login';
import Logout from './logout/logout';
import { AnimatePresence } from 'framer-motion';

function MainPages() {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
                <Route exact path="/" component={Home} />
                <Route  path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route  path="/logout" component={Logout} />
            </Switch>
        </AnimatePresence>
    );
}

export default MainPages;
