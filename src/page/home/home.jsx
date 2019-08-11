import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import Minion from '../../a.jpg';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: ''
        }
    }

    componentWillMount() {
        let cookie = document.cookie;
        if (cookie.length == 0) {
            window.location.href = "/login";
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="主页" />
                <img src={Minion} />
            </div>
        );
    }
}

export default Home;