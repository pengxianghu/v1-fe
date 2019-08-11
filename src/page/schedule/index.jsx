import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import ScheduleState from 'component/schedule-state/index.jsx';

import './index.scss';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_do_list: [],
            user_id: '',
        }
    }

    componentWillMount() {
        let n_cookie = document.cookie;
        if (n_cookie.length == 0) {
            return
        }
        let u_id = n_cookie.slice(23);
        this.setState({
            user_id: u_id
        })
        this.getScheduleByUser(u_id);
    }

    getScheduleByUser(u_id) {
        axios.get(`/api/schedule/` + u_id)
            .then(res => {
                console.log("get schedule by user success");
                this.setState({
                    to_do_list: res.data.data
                })
            });
    }

    deleteScheduleHandleClick(id) {
        console.log("delete schedule by id: " + id);
        axios.delete(`/api/schedule/` + id)
            .then(res => {
                if (res.data.code == 0) {
                    console.log("delete schedule success.");
                    alert('删除成功!');
                    this.getScheduleByUser(this.state.user_id);
                }
            });
    }

    render() {
        const list = this.state.to_do_list.map((schedule) =>
            <tr key={schedule.id}>
                <th>{schedule.id}</th>
                <td>{schedule.topic}</td>
                <td>{schedule.content}</td>
                <td>{schedule.created_at}</td>
                <td><ScheduleState state={schedule.status} /></td>
                <td><button className="btn btn-danger btn-sm" onClick={e => { this.deleteScheduleHandleClick(schedule.id, e) }}>删除</button></td>
            </tr>);
        return (
            <div id="page-wrapper">
                <PageTitle title="待办事项" />
                <div>
                    <button className='btn btn-default'>
                        <NavLink exact to="/schedule/add">添加</NavLink>
                    </button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col-md-1">#</th>
                                <th className="col-md-2">主题</th>
                                <th className="col-md-5">内容</th>
                                <th className="col-md-2">创建时间</th>
                                <th className="col-md-1">状态</th>
                                <th className="col-md-1">删除</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Schedule;