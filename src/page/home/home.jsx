import React from 'react';

import PageTitle from 'component/page-title/index.jsx';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: ''
        }
    }

    componentWillMount() {
        let str = sessionStorage.getItem('userInfo');
        if (str == null) {
            window.location.href = "/login";
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="主页" />
            </div>
        );
    }
}

export default Home;