import React, { Component } from 'react';
import { Input, Space, Modal } from 'antd';
import { Button } from 'antd';
import { Typography } from 'antd';
import { DatePicker } from 'antd';
import RiskyShifts from './riskyshifts'
import RiskLevel from './risklevel'
import Type from './type'
import './trans.css'
const server = 'http://127.0.0.1:8000/ESS';

const { Title } = Typography;
class AskRiskLevel extends Component {
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
    if (this.props.No === "")
      alert('班次号不可为空！')
    else if (this.props.start_p === "")
      alert('出发地不可为空！')
    else if (this.props.end_p === "")
      alert('目的地不可为空！')
    else if (this.props.start_t === "")
      alert('日期不可为空！')
    else if (this.props.danger_level === "")
      alert('风险等级不可为空！')
    else {
      fetch(
        server + '/transport/record/?No=' + this.props.No
        + '&start_p=' + this.props.start_p + '&end_p=' + this.props.end_p
        + '&date=' + this.props.start_t + '&danger_level=' + this.state.riskyLevelToNum[this.state.danger_level]
        + '&type=' + this.props.type
      )
        .then(res => res.json())
        .then(data => {
          if (data['flag'])
            alert("导入成功!")
          else
            alert("导入失败!")
        })
        .catch(e => console.log('错误:', e))
    }
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
          导入
              </Button>
        <Modal
          title="修改风险等级"
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




class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shift_id: 0,
      No: "",
      start_t: "",
      start_p: "",
      end_p: "",
      danger_level: "",
      type: 0,
      allShifts: [],
      riskyLevel: {
        "安全": 0,
        "低风险": 1,
        "风险": 2,
        "高风险": 3
      }
    }
    this.onDateChange = this.onDateChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.query = this.query.bind(this);
    this.sendWarning = this.sendWarning.bind(this);
    this.getShift = this.getShift.bind(this);
  }

  //同时处理三个输入
  onInputChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }

  onDateChange(date, dateString) {
    this.setState({
      start_t: dateString
    })
  }

  getShift() {
    fetch(
      server + '/transport/shifts/'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          allShifts: data
        })
      })
      .catch(e => console.log('错误:', e))
  }

  query() {
    fetch(
      server + '/transport/search1/?'
      + 'start_p=' + this.state.start_p + '&end_p=' + this.state.end_p
      + '&No=' + this.state.No + '&date=' + this.state.start_t
      + '&type=' + this.state.type
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          allShifts: data
        })
      })
      .catch(e => console.log('错误:', e))
  }

  sendWarning() {
    fetch(
      server + '/transport/mail/'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert("成功发送邮件!")
      })
      .catch(e => console.log('错误:', e))
  }

  render() {
    return (
      <div>
        <div className="container">
          <center><Title level={2}>同乘交通自查系统管理员操作台</Title></center>
          <Space direction="vertical">
            <Input className="input-width" placeholder="班次号" onChange={e => this.onInputChange('No', e)} />
            <Input className="input-width" placeholder="起始地" onChange={e => this.onInputChange('start_p', e)} />
            <Input className="input-width" placeholder="目的地" onChange={e => this.onInputChange('end_p', e)} />
            <DatePicker className="input-width" onChange={(date, dateString) => this.onDateChange(date, dateString)} />
            <Type onChange={(ty) => this.setState({ type: ty })} />
            <AskRiskLevel No={this.state.No} start_p={this.state.start_p} end_p={this.state.end_p} start_t={this.state.start_t} type={this.state.type} />
            <Button type="primary" onClick={() => this.query()}>查询对应班次</Button>
          </Space>
        </div>

        <div className="container">
          <center><Title level={3}>当前班次表</Title></center>
          <div className="table-container">
            <RiskyShifts content={this.state.allShifts} role='admin' />
          </div>
          <center>
            {/* <Button type="primary" onClick={() => this.getShift()}>显示全部班次</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            <Button type="primary" onClick={() => this.sendWarning()}>一键发布提醒</Button>
          </center>
        </div>
      </div>
    )
  }
}

export default Admin;