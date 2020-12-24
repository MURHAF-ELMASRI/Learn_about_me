import {Route, Switch} from 'react-router-dom'
import Home from './home/Home';
import Signup from './signup/signup';
import Login from './login/login';
import logout from './logout/logout';

function MainPages() {
    

    return (
        
        <Switch>
            <Route exact path="/" component={Home} />
            <Route  path="/signup" component={Signup} />
            <Route  path="/login" component={ Login} />
            <Route  path="/logout" component={ logout} />
        </Switch>
    )

}

export default MainPages