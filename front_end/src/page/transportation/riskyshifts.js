import React, { Component } from 'react';
import { Button, List, Tag, Modal, Table, Space, Result } from 'antd';
import RiskLevel from './risklevel';
import FileSaver from 'file-saver';
import cookie from 'react-cookies';


const server = 'http://127.0.0.1:8000/ESS';

class DetailInfo extends Component {
    state = {
        visible: false,
        userInfo: []
    };

    showModal = () => {
        fetch(
            server + '/transport/detail/?shift_id=' + this.props.shift_id
        )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    userInfo: data
                })
            })
            .catch(e => console.log('错误:', e))
        this.setState({
            visible: true,
        })
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    sendWarning() {
        fetch(
            server + '/transport/mail/?shift_id=' + this.props.shift_id
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("成功发送邮件!")
            })
            .catch(e => console.log('错误:', e))
    }

    exportInfo(data) {
        let str = '姓名,邮箱';
        //通过循环拿出data数据源里的数据，并塞到str中
        for (const i in data) {
            str += '\n' + data[i].name + ',' +
                data[i].email
        }
        //Excel打开后中文乱码添加如下字符串解决
        let exportContent = "\uFEFF";
        let blob = new Blob([exportContent + str], {
            type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, this.props.shift_id + ".csv");
    }

    render() {
        return (
            <div>
                <Button type="small" onClick={this.showModal}>
                    详情
                </Button>
                <Modal
                    title="班次详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.userInfo}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.name}
                                    description={"邮箱:" + item.email}
                                />
                            </List.Item>
                        )}
                    >
                    </List>
                    <Button type="primary" onClick={e => { e.preventDefault(); this.sendWarning() }} >发布提醒</Button>
                    <Button type="primary" onClick={e => { e.preventDefault(); this.exportInfo(this.state.userInfo) }} >导出信息</Button>
                </Modal>
            </div>
        );
    }
}

class ModifyInfo extends Component {
    state = {
        visible: false,
        danger_level: 0,
        riskyLevelToNum: {
            "安全": 0,
            "低风险": 1,
            "风险": 2,
            "高风险": 3
        },
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        fetch(
            server + '/transport/modify/?&shift_id=' + this.props.shift_id + '&danger_level=' + this.state.riskyLevelToNum[this.state.danger_level]
        )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('成功修改！')
            })
            .catch(e => console.log('错误:', e))
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="small" onClick={this.showModal}>
                    修改
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <RiskLevel onChange={(lv) => this.setState({ danger_level: lv })} />
                </Modal>
            </div>
        );
    }
}

class RiskTag extends Component {
    constructor(props) {
        super(props);
        this.colors = ["green", "orange", "gold", "red"];
        this.texts = ["安全", "低风险", "风险", "高风险"];
    }

    dangerLevel2Color = danger_level => 0 <= danger_level && danger_level < this.colors.length ? this.colors[danger_level] : "black";
    dangerLevel2Text = danger_level => 0 <= danger_level && danger_level < this.texts.length ? this.texts[danger_level] : "出错了";

    render() {
        return (<Tag color={this.dangerLevel2Color(this.props.danger_level)}>{this.dangerLevel2Text(this.props.danger_level)}</Tag>)
    }
}

class RiskyShifts extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.content
        this.userBind = this.userBind.bind(this);

        this.columns = [
            {
                title: '班次号',
                dataIndex: 'No',
                key: 'No',
            },
            {
                title: '出发地',
                dataIndex: 'start_p',
                key: 'start_p',
            },
            {
                title: '到达地',
                dataIndex: 'end_p',
                key: 'end_p',
            },
            {
                title: '发车日期',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: '风险等级',
                dataIndex: 'danger_level',
                key: 'danger_level',
                render: (val) => <RiskTag danger_level={val} />
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => this.action(this.props.role, record.shift_id, record.No)
            },
        ];
        fetch('http://127.0.0.1:8000/user/profile/', {
            method: "get",
            mode: "cors",
            credentials: 'include',
            headers: {
                'sessionid': cookie.loadAll().sessionid,
            }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    uid: result.uid,
                })
            })
    }

    userBind(id, No) {

        fetch(
            server + '/transport/register/?uid=' + this.state.uid + '&shift_id=' + id + '&type=' + this.props.type,
            {
                credentials: 'include',
                headers: {
                    'sessionid': cookie.loadAll().sessionid,
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                if (!data['is_login'])
                    alert('绑定失败！请登录！');
                else if (!data['is_auth'])
                    alert('绑定失败！请实名认证！');
                else if (!data['is_register'])
                    alert("成功绑定" + No + "!")
                else
                    alert("您已绑定过该班次！")
            })
            .catch(e => console.log('错误:', e))
    }

    // action定义了显示时的操作
    //    对用户来说是绑定
    //    对管理员来说是列出详情（车次中的乘客信息，下属有导出 与 发布提醒功能）及修改班次风险等级
    // 角色role由对应的标签传入
    action(r, shift_id, No) {
        if (r === 'user') return (<Button type="primary" onClick={e => { e.preventDefault(); this.userBind(shift_id, No) }}>绑定</Button>)
        else if (r === 'admin') return (
            <Space direction="vertical" size={1}>
                <DetailInfo shift_id={shift_id} />
                <ModifyInfo shift_id={shift_id} />
            </Space>
        )
        else return null
    }

    render() {
        return (
            // 用antd中的Table可以实现自动分页，提高前端渲染效率
            <Table className="tble" columns={this.columns} dataSource={this.props.content}></Table>
        )
    }
}

export default RiskyShifts;