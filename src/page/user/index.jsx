import React from 'react';

import PageTitle from 'component/page-title/index.jsx';

class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="用户管理" />
            </div>
        );
    }
}

export default User;