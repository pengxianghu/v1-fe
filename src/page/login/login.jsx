/*
 * @Description: login component
 * @Autor: pengxianghu
 * @Date: 2019-08-11 09:24:03
 * @LastEditTime: 2019-08-17 21:13:09
 */


import React from 'react';
import axios from 'axios';

import './login.scss';

axios.defaults.withCredentials = true;


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            pwd: "",
            is_login: false
        }
    }

    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        })
    }

    onInputKeyUp(e) {
        if (e.keyCode == 13) {
            this.submitHandleClick();
        }
    }

    submitHandleClick() {
        console.log(this.state.name);

        let data = { id: "", name: this.state.name, pwd: this.state.pwd }
        axios.post(`/api/user/` + this.state.name, data)
            .then(res => {
                if (res.data.code == 0) {
                    console.log("login success.");
                    window.location.href = "/";
                    let s = JSON.stringify(res.data.data);
                    sessionStorage.setItem('userInfo', s);
                }
            }).catch(err => {
                alert('用户名或密码错误!');
            });
    }

    checkCookie() {
        axios.get(`/api/user/cookie`)
            .then(res => {
                console.log("check cookie");
                console.log(res);
            });
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 hupx 的主页</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="请输入用户名"
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)} />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name="pwd"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)} />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={e => { this.submitHandleClick(e) }}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;