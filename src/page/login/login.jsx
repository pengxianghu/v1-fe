import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            pwd: "",
            is_login: false
        }
    }

    nameValueChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    pwdValueChange(e) {
        this.setState({
            pwd: e.target.value
        })
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
                                    name="username"
                                    className="form-control"
                                    placeholder="请输入用户名"
                                    onChange={e => this.nameValueChange(e)} />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onChange={e => this.pwdValueChange(e)} />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={e => { this.submitHandleClick(e) }}>登录</button>
                            {/* <button className="btn btn-lg btn-primary btn-block"
                                onClick={e => { this.checkCookie(e) }}>验证cookie</button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;