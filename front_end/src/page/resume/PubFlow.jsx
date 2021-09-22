//人口流动信息发布页面，需要管理员权限
//用到了material-ui组件，请在终端输入 npm install @material-ui/core 进行安装
//状态：完善中
//负责人：求昊泽
import React from 'react'
import TextField from '@material-ui/core/TextField';
import './flowrelease.css'
import Button from '@material-ui/core/Button';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const server = 'http://127.0.0.1:8000';

class PubFlow extends React.Component {
	constructor(props) { //构造函数
		super(props);
		this.state = {
			Province_source: '',
			Province_destination: '',
			Amount: '',
			Date: '',
		};
		this.handleClick = this.handleClick.bind(this);
		this.write = this.write.bind(this);
	}

	handleChange1 = (event) => {
		this.setState({
			Province_source: event.target.value,
		});
	};
	handleChange2 = (event) => {
		this.setState({
			Province_destination: event.target.value,
		});
	};
	handleChange3 = (event) => {
		this.setState({
			Amount: event.target.value,
		});
	};
	handleChange4 = (event) => {
		this.setState({
			Date: event.target.value,
		});
	};

	async write() {
		let data = { ...this.state };
		if ( (data.Province_destination != data.Province_source) && data.Amount != '' && data.Province_destination != '' && data.Province_source != '' && data.Date != '') {
			console.log(data);
			let res = await axios.post(`write/`, data);
			console.log(res);
			alert("提交成功！");
		}
	}

	handleClick = () => {
		if (this.state.Province_destination == this.state.Province_source)
			alert("提交失败，流入省份不能和流出省份相同！");
		else if ( this.state.Amount != '' && this.state.Province_destination != '' && this.state.Province_source != '' && this.state.Date != '')
			this.write();
		else
			alert("提交失败，不允许输入为空且流入省份不能和流出省份相同！");
		this.setState({ //清空所有输入框
			Province_source: '',
			Province_destination: '',
			Amount: '',
			Date: '',
		});
	};

	render() {
		return (
			<div className='背景'>

				<div className='part1'>
					<label className='Label1'>来源省份：</label>
					<TextField
						value={this.state.Province_source}
						onChange={this.handleChange1}
						className='Text'
						id="provincesource"
						label="如：浙江（末尾不带“省”）"
						variant="outlined"
						color="primary"
					/>
				</div>

				<div className='part2'>
					<label className='Label1'>流入省份：</label>
					<TextField
						value={this.state.Province_destination}
						onChange={this.handleChange2}
						className='Text'
						id="provincedestination"
						label="如：江苏（末尾不带“省”）"
						variant="outlined"
						color="primary"
					/>
				</div>

				<div className='part3'>
					<label className='Label1'>流动人数：</label>
					<TextField
						value={this.state.Amount}
						onChange={this.handleChange3}
						className='Text'
						id="amount"
						label="请输入人口流动数量"
						variant="outlined"
						color="primary"
					/>
				</div>

				<div className='part4'>
					<label className='Label1'>输入日期：</label>
					<TextField
						value={this.state.Date}
						onChange={this.handleChange4}
						className='Text'
						id="date"
						label="请按格式输入日期，如：“2020-06-01”"
						variant="outlined"
						color="primary"
					/>
				</div>

				<div className='part5'>
					<Button variant="contained" color="primary" onClick={this.handleClick} className='Label1'>提交</Button>

				</div>

			</div>
		);
	}
}

export default PubFlow