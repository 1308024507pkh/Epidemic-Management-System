import React from 'react';
//import {getdata} from './fetcher.js';
// import fuckdata from './data.json'
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Select,Comment,Avatar,Tag } from 'antd';
import './resumeaction.css';
import {getdata} from './fetcher';

const { Header, Content,Footer} = Layout;
const { Option } = Select;

let Type = ["复工复产","社区管控","交通出行","医疗服务"];
// let list = fuckdata.data;

class ResumeAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			selectedkey: 0,
			selectedprovince: ''
		};
		getdata().then((value => {
			console.log(value);
			//console.log(value.data.sort((a, b)=>(b.time-a.time)));
			this.setState({ data: value.data});
			console.log(this.state.data);
		}));
	};
	handleSelect = (index) => {
		console.log(index);
		this.setState({
			selectedkey: Number(index.key) - 1
		});
		console.log(this.state.data);
		console.log(this.state.selectedkey);
	};

	onChange = (value) => {
		this.setState({
			selectedprovince: value
		});
		console.log(this.state.selectedprovince);
	};

	render() {
	//	this.state.data.sort((a, b)=>(b.time-a.time));
		return (
			<Layout>
				<Header className="header">
					<Menu
						mode="horizontal"
						defaultSelectedKeys={['1']}
						onSelect={this.handleSelect}
					>
						<Menu.Item key="1">复工复产</Menu.Item>
						<Menu.Item key="2">社区管控</Menu.Item>
						<Menu.Item key="3">交通出行</Menu.Item>
						<Menu.Item key="4">医疗服务</Menu.Item>
					</Menu>
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder="选择您需要查询的省市"
						optionFilterProp="children"
						onChange={this.onChange}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						<Option value="北京">北京</Option>
						<Option value="上海">上海</Option>
						<Option value="天津">天津</Option>
						<Option value="重庆">重庆</Option>
						<Option value="浙江">浙江</Option>
						<Option value="江苏">江苏</Option>
						<Option value="新疆">新疆</Option>
						<Option value="西藏">西藏</Option>
						<Option value="青海">青海</Option>
						<Option value="四川">四川</Option>
						<Option value="陕西">陕西</Option>
						<Option value="山西">山西</Option>
						<Option value="贵州">贵州</Option>
						<Option value="云南">云南</Option>
						<Option value="宁夏">宁夏</Option>
						<Option value="广东">广东</Option>
						<Option value="广西">广西</Option>
						<Option value="海南">海南</Option>
						<Option value="福建">福建</Option>
						<Option value="安徽">安徽</Option>
						<Option value="黑龙江">黑龙江</Option>
						<Option value="辽宁">辽宁</Option>
						<Option value="吉林">吉林</Option>
						<Option value="河南">河北</Option>
						<Option value="江西">江西</Option>
						<Option value="湖南">湖南</Option>
						<Option value="湖北">湖北</Option>
						<Option value="香港">香港</Option>
						<Option value="台湾">台湾</Option>
						<Option value="内蒙古">内蒙古</Option>
						<Option value="山东">山东</Option>
						<Option value="甘肃">甘肃</Option>
						<Option value="澳门">澳门</Option>
					</Select>
				</Header>
				<Layout>
					<Layout style={{ padding: '0 24px 24px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}> </Breadcrumb>
						<div className="measure">
						  <div className="rightpart">
						    <div className="measure-list">
						      <h2><span>【{Type[this.state.selectedkey]}】举措列表</span></h2>
						      <ul class="measure-table">
						      {
							  this.state.data.sort((a, b)=>(a.time-b.time))
							  .map((item) => {
								if(item.type === Type[this.state.selectedkey])
									if(this.state.selectedprovince === '' || this.state.selectedprovince === item.province)
										return (
											<li> 
												<a href={"#"+item.id}>{"举措编号："+item.id}</a>
												<span>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布日期：{item.time}&nbsp;&nbsp;&nbsp;
												</span>
											</li>
										);
							    })
			
						      }
						      </ul>
						    </div>
						    <div className="about-me">
							  <h2><span>联系我们</span></h2>
							  <p>若您对我们发布的任何举措存在疑问，可以选择进入答疑论坛提出您的问题；或者拨打我们的咨询电话86-123456，我们竭诚为您提供24小时供电服务！当然您也可以发送邮件至Rjgcjc@zju.edu.cn，我们将最及时地为您答疑解惑。</p>
						    </div>
						  </div>
						  <div className="leftpart">
						  {
							this.state.data.sort((a, b)=>(a.time-b.time))
							.map((item) => {
								if(item.type === Type[this.state.selectedkey])
									if(this.state.selectedprovince === '' || this.state.selectedprovince === item.province)
										return (
											<Content
												className="site-layout-background"
												style={{
													padding: 24,
													margin: 0,
													minHeight: 0,
												}}
											>
												<div className="measure-box" id={item.id}>
													<div className="measure-id">
												    	<Avatar
															size="large"
															src={require('./province_icon/' + item.province + '.png')}
															shape="square"
														/>
														<span className="title">【{item.type}举措】编号：{item.id}</span>
													</div>
													<div className="measure-info">
														<Tag color="#2db7f5">{item.province}</Tag>
														<Tag color="#87d068">{item.type}</Tag>
														<Tag color="red">发布于{item.time}</Tag>
													</div>
													<p className="measure-content">{item.content}</p>
												</div>
											</Content>
										);
							})
						} 
							<Footer class="footer">
						    	As long as we work together, we will surely overcome the epidemic！
        					</Footer>
						  </div>
						</div>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

export default ResumeAction
