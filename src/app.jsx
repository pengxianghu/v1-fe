import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';

import Home from 'page/home/home.jsx';
import Login from 'page/login/login.jsx';
import Error from 'page/error/index.jsx';
import Layout from 'component/layout/index.jsx';
import Schedule from 'page/schedule/index.jsx';
import User from 'page/user/index.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'component/layout/theme.css';
import './index.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={(proos) => (
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/schedule" component={Schedule} />
                                <Route path="/user" component={User} />
                                <Route component={Error} />
                            </Switch>
                        </Layout>
                    )} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)