import React from 'react';
import axios from 'axios';

import { backendAddress } from '../../const.jsx';
import PageTitle from 'component/page-title/index.jsx';

import './index.scss';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_do_list: [],
            user_id: '',
            topic: '',
            content: ''
        }
    }

    componentWillMount() {
        let str = sessionStorage.getItem('userInfo');
        if (str == null) {
            return
        }
        var userInfo = JSON.parse(str);
        let u_id =  userInfo.id.slice(11);
        this.setState({
            user_id: userInfo.id.slice(11)
        })
        axios.get(backendAddress + `/schedule/` + u_id)
            .then(res => {
                console.log("get schedule by user success");
                this.setState({
                    to_do_list: res.data.data
                })
            });
    }

    topicValueChange(e) {
        this.setState({
            topic: e.target.value
        })
    }

    contentValueChange(e) {
        this.setState({
            content: e.target.value
        })
    }

    addHandleClick() {
        console.log("topic: " + this.state.topic);
        console.log("content: " + this.state.content);

        let data = { id: 0, user_id: this.state.user_id, topic: this.state.topic, content: this.state.content }
        axios.post(backendAddress + `/schedule`, data)
            .then(res => {
                if (res.data.code == 0) {
                    console.log("add schedule success.");
                }
            });
    }

    deleteScheduleHandleClick(id) {
        console.log("delete schedule by id: " + id);
        axios.delete(backendAddress + `/schedule/` + id)
            .then(res => {
                if(res.data.code == 0) {
                    console.log("delete schedule success.");
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
                <td>{schedule.status}</td>
                <td><button className="btn btn-danger btn-sm" onClick={e => { this.deleteScheduleHandleClick(schedule.id, e) }}>删除</button></td>
            </tr>);
        return (
            <div id="page-wrapper">
                <PageTitle title="待办事项" />
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
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">主题:</label>
                        <div className="col-md-4">
                            <input type="text" className="form-control form-input" onChange={e => this.topicValueChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">内容:</label>
                        <div className="col-md-6">
                            <textarea className="form-control" rows="3" onChange={e => this.contentValueChange(e)}></textarea>
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-default offset-md-6 col-md-1' onClick={e => { this.addHandleClick(e) }}>添加</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Schedule;