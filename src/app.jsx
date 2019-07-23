import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';

// import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import Home from './component/home/home.jsx';
import Login from './component/login/login.jsx';

ReactDOM.render(
    <div>
        <Router>
            <div>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/login">login</Link>
                </div>
                <hr />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Redirect from="*"  to="/"/>
                </Switch>
            </div>
        </Router>
    </div>,
    document.getElementById('app')
)