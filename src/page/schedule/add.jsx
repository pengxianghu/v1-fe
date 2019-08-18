/*
 * @Description: add schedule component
 * @Autor: pengxianghu
 * @Date: 2019-08-11 09:24:03
 * @LastEditTime: 2019-08-17 21:12:59
 */

import React from 'react';
import axios from 'axios';

import PageTitle from 'component/page-title/index.jsx';

class AddSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            topic: '',
            content: '',
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
    }

    goBackClick() {
        this.props.history.goBack();
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
        axios.post(`/api/schedule`, data)
            .then(res => {
                if (res.data.code == 0) {
                    console.log("add schedule success.");
                    alert('添加成功!');
                }
            });
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加事项" />
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
                    <div className="row">
                        <div className="col-md-2 col-md-offset-2">
                            <button className='btn btn-default' onClick={e => { this.addHandleClick(e) }}>添加</button>&nbsp;
                            <button className='btn btn-default' onClick={e => this.goBackClick(e)}>返回</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddSchedule;