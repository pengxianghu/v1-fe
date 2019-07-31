import React from 'react';
import axios from 'axios';

import { backendAddress } from '../../const.jsx';
import PageTitle from 'component/page-title/index.jsx';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_do_list: []
        }
    }

    componentWillMount() {
        let str = sessionStorage.getItem('userInfo');
        var userInfo = JSON.parse(str);
        let u_id = userInfo.id.slice(11);
        axios.get(backendAddress + `/schedule/` + u_id)
            .then(res => {
                console.log("get schedule by user success");
                this.setState({
                    to_do_list: res.data.data
                })
            });
    }

    render() {
        const list = this.state.to_do_list.map((schedule) =>
            <tr key={schedule.id}>
                <th >{schedule.id}</th>
                <td>{schedule.created_at}</td>
                <td>{schedule.topic}</td>
                <td>{schedule.content}</td>
            </tr>);
        return (
            <div id="page-wrapper">
                <PageTitle title="待办事项" />
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-md-1">#</th>
                            <th className="col-md-2">创建时间</th>
                            <th className="col-md-2">主题</th>
                            <th className="col-md-7">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Schedule;