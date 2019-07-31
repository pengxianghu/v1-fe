import React from 'react';

import { Link }     from 'react-router-dom';
import './nav-top.scss';

class NavTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin'
        }
    }

    componentWillMount() {
        let str = sessionStorage.getItem('userInfo');
        if(str == null) {
            return
        }
        var userInfo = JSON.parse(str);
        this.setState({
            username : userInfo.name
        });        
    }

    onLogout(){
        console.log("logout func");
    }

    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>个人主页</b></Link>
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
                                <a onClick={() => {this.onLogout()}}>
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