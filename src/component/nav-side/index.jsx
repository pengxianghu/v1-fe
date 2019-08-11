import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../layout/theme.css';

class NavSide extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            <NavLink exact to="/">首页</NavLink>
                        </li>
                        <li>
                            <NavLink to="/schedule">待办事项</NavLink>
                        </li>
                        <li>
                            <NavLink to="/user">用户管理</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavSide;