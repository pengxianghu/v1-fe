import React from 'react';

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
        console.log(this.state.pwd);

        let data = { id: "", name: this.state.name, pwd: this.state.pwd }
        let body = JSON.stringify(data, null, 2)
        const init = {
            method: 'POST',
            mode: "no-cors",
            credentials: 'include', // cookies
            body
        }
        fetch(
            'http://127.0.0.1:25001/user/' + this.state.name,
            init
        ).then(res => res.json())
            .then(r => {
                console.log(r);
                if (r.code == 0) {
                    this.setState({
                        is_login: true
                    })
                }
                console.log("login success.");
            })
            .catch(e => console.log('错误:', e))
    }


    cookieHandleClick() {

        let data = { id: "1" }
        let body = JSON.stringify(data, null, 2)
        const init = {
            method: 'POST',
            mode: "no-cors",
            credentials: 'include', // cookies
            body
        }
        fetch(
            'http://127.0.0.1:25001/cookie',
            init
        ).then(r => {
                console.log(r);
            })
            .catch(e => console.log('错误:', e))
    }

    render() {
        let button;
        if (this.state.is_login) {
            button = <div>login success</div>;
        } else {
            button = <div>not yet</div>;
        }
        return (
            <div>
                <div>
                    <p>name</p>
                    <input type="text" onChange={(e) => { this.nameValueChange(e) }} />
                </div>
                <div>
                    <p>pwd</p>
                    <input type="text" onChange={(e) => { this.pwdValueChange(e) }} />
                </div>
                <div>
                    <button onClick={(e) => { this.submitHandleClick(e) }}>提交</button>
                </div>
                <div>
                    <button onClick={(e) => { this.cookieHandleClick(e) }}>设置cookie</button>
                </div>
                {button}
            </div>
        );
    }
}

export default Login;