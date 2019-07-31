import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: ''
        }
    }

    componentDidMount() {
        console.log("首页");
    }

    render() {
        return (
            <div id="page-wrapper">
                <button className='btn btn-default'>首页</button>
            </div>
        );
    }
}

export default Home;