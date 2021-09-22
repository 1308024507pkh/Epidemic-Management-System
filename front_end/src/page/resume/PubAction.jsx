//举措信息发布页面，需要管理员权限
//用到了material-ui组件，请在终端输入 npm install @material-ui/core npm install @material-ui/icons安装
//状态：完善中
//负责人：求昊泽
import './actionrelease.css'
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const server = 'http://127.0.0.1:8000';

class PubAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			News_id: '',
			Time: '',
			Province: '',
			Type: '复工复产',
			Content: '',
		};
		this.handleClick = this.handleClick.bind(this);
		this.write = this.write.bind(this);
	}

	handleChange1 = (event) => {
		this.setState({ News_id: event.target.value });
	}
	handleChange2 = (event) => {
		this.setState({ Time: event.target.value });
	}
	handleChange3 = (event) => {
		this.setState({ Province: event.target.value });
	}
	handleChange4 = (event) => {
		this.setState({ Type: event.target.value });
	}
	handleChange5 = (event) => {
		this.setState({ Content: event.target.value });
	}
	async write() {
		let data = { ...this.state };
		if (data.Content !== '' && data.News_id !== '' && data.Province !== '' && data.Time !== '' && data.Type !== '') {
			console.log(data);
			let res = await axios.post(`action/`, data);
			console.log(res);
			console.log(res.data)
			if (res.data.success === 'true') alert("提交成功！");
			else alert("提交失败");
		}
	}
	handleClick = () => {
		if (this.state.Content !== '' && this.state.News_id !== '' && this.state.Province !== '' && this.state.Time !== '' && this.state.Type !== '')
			this.write();
		else
			alert("提交失败，不允许输入为空！")
		this.setState({
			News_id: '',
			Time: '',
			Province: '',
			Type: '复工复产',
			Content: '',
		});
	};

	render() {
		return (
			<div className='背景2'>

				<div className='Part1'>
					<label className='CC6'>举措编号：</label>
					<TextField
						className='举措编号'
						value={this.state.News_id}
						onChange={this.handleChange1}
						id="id"
						label="输入例如:浙江20200601第02号"
						variant="outlined"
						color="primary"
					/>
				</div>

				<div className='Part2'>
					<label className='CC6'>举措时间：</label>
					<TextField
						className='举措时间'
						value={this.state.Time}
						onChange={this.handleChange2}
						id="时间"
						label="请按格式输入日期，如：“2020-06-01”"
						variant="outlined"
						color="primary"
					/>
				</div>

				<div className='Part3'>
					<label className='CC6'>所在省份：</label>
					<TextField
						className='所在省份'
						value={this.state.Province}
						onChange={this.handleChange3}
						id="province"
						label="输入省份"
						variant="outlined"
						color="primary"
					/>
				</div>

				<div className='Part4'>
					<form>
						<label className='CC6'>举措类型：</label>
						<FormControl variant="outlined" >
							<InputLabel id="Action Selection">Action Selection</InputLabel>
							<Select
								labelId="Action Selection"
								id="Action Selection"
								value={this.state.Type}
								onChange={this.handleChange4}
								label="Action Selection"
								className='举措类型'>
								<MenuItem value="复工复产">复工复产</MenuItem>
								<MenuItem value="交通出行">交通出行</MenuItem>
								<MenuItem value="社区管控">社区管控</MenuItem>
								<MenuItem value="医疗服务">医疗服务</MenuItem>
							</Select>
						</FormControl>
					</form>
				</div>

				<div className='Part5'>
					<label className='CC6'>举措详情：</label>
					<TextField
						className='举措详情'
						value={this.state.Content}
						onChange={this.handleChange5}
						id="details"
						label="details"
						multiline
						rows={20}
						defaultValue=""
						variant="outlined"
						color="primary"
					/>
				</div>

				<div className='Part6'>
					<Button size="large" startIcon={<CheckCircleOutlineIcon />} variant="contained" color="primary" onClick={this.handleClick} className='Button2'>提交</Button>
				</div>

			</div>

		);
	}
}

export default PubAction