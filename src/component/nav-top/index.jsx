import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import './nav-top.scss';

class NavTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin'
        }
    }

    componentWillMount() {
        let n_cookie = document.cookie;
        if (n_cookie == null) {
            return
        }
        let str = sessionStorage.getItem('userInfo');
        if (str == null) {
            this.setState({
                username: 'admin'
            });
            return 
        }
        let user = JSON.parse(str);
        console.log(user);
        this.setState({
            username: user.name
        });
    }

    onLogout() {
        axios.post(`/api/logout`)
            .then(res => {
                console.log("logout success.");
            }).catch(err => {
                alert('logout failed!');
            });
        sessionStorage.removeItem('userInfo');
    }

    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>hupx</b></Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                    ? <span>欢迎，{this.state.username}</span>
                                    : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => { this.onLogout() }}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;