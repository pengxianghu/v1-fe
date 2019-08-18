import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import ScheduleState from 'component/schedule-state/index.jsx';

import { Table, Button, Input, Tag, Dialog, Form } from 'element-react';
import { Message } from 'element-react';

import './index.scss';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            user_id: '',
            tags: ["", "gray", "primary", "warning", "danger"],
            editDialogVisible: false,
            editForm: {
                id: 0,
                user_id: '',
                topic: '',
                content: '',
                created_at: '',
                status: 0,
            },
            columns: [
                {
                    label: "#",
                    prop: "id"
                },
                {
                    label: "主题",
                    prop: "topic"
                },
                {
                    label: "内容",
                    prop: "content"
                },
                {
                    label: "创建时间",
                    prop: "created_at"
                },
                {
                    label: "状态",
                    prop: "status",
                    render: (row) => {
                        var t = this.state.tags[row.status]
                        return (
                            <span>
                                <Tag type={t}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Tag>
                            </span>
                        )
                    }
                },
                {
                    label: "操作",
                    prop: "do",
                    render: (row) => {
                        return (
                            <span>
                                <Button plain={true} type="info" size="small" onClick={() => this.makeEditDialogVisiable(row)}>编辑</Button>
                                <Button type="danger" size="small" onClick={() => this.deleteScheduleHandleClick(row)}>删除</Button>
                            </span>
                        )
                    }
                }
            ]
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
        axios.get(`/api/schedules/user/` + u_id)
            .then(res => {
                console.log("get schedule by user success");
                this.setState({
                    tableData: res.data.data
                })
            });
    }

    deleteScheduleHandleClick(row) {
        console.log("delete schedule by id: " + row.id);
        axios.delete(`/api/schedule/` + row.id)
            .then(res => {
                if (res.data.code == 0) {
                    console.log("delete schedule success.");
                    alert('删除成功!');
                    // Message({
                    //     showClose: true,
                    //     message: '恭喜你，这是一条成功消息',
                    //     type: 'success'
                    //   });

                    this.getScheduleByUser(this.state.user_id);
                }
            });
    }

    updateConfirm() {
        this.setState({
            editDialogVisible: false
        })
        axios.put(`/api/schedule`, this.state.editForm)
            .then(res => {
                if (res.data.code == 0) {
                    console.log("update schedule success.");
                    this.getScheduleByUser(this.state.user_id);
                }
            });
    }

    onValueChange(key, value) {
        this.state.editForm[key] = value;
        this.forceUpdate();
    }

    makeEditDialogVisiable(row) {
        this.setState({
            editDialogVisible: true
        })
        axios.get(`/api/schedule/` + row.id)
            .then(res => {
                console.log("get schedule by id success");
                this.setState({
                    editForm: res.data.data
                })
                console.log(res.data.data);
            });

        console.log("makeEditDialogVisiable");
    }

    render() {

        return (
            <div id="page-wrapper">
                <PageTitle title="待办事项" />
                
                <div>
                    <button className='btn btn-default'>
                        <NavLink exact to="/schedule/add">添加</NavLink>
                    </button>
                </div>

                <div>
                    <Table style={{ width: '100%' }}
                        columns={this.state.columns}
                        data={this.state.tableData}
                        border={true}
                    />
                </div>

                <Dialog
                    title="修改"
                    visible={this.state.editDialogVisible}
                    onCancel={() => this.setState({ editDialogVisible: false })}
                >
                    <Dialog.Body>
                        <Form model={this.state.editForm}>
                            <Form.Item label="主题" labelWidth="120">
                                <Input value={this.state.editForm.topic} name='topic' onChange={this.onValueChange.bind(this, 'topic')}></Input>
                            </Form.Item>
                            <Form.Item label="内容" labelWidth="120">
                                <Input type='textarea' value={this.state.editForm.content} name='content' onChange={this.onValueChange.bind(this, 'content')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ editDialogVisible: false })}>取 消</Button>
                        <Button type="primary" onClick={() => this.updateConfirm()}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
}

export default Schedule;