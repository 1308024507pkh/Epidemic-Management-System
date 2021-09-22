import React from 'react';
import ReactDOM from 'react-dom';
// import MyData from './PopulationFlow.json' /* 获取json信息，后续会删掉换为利用fetcher.js抓取MyData */
import echarts from 'echarts';
import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
//import {getf} from'./fetcher.js';
import { Table,Layout, Menu, PageHeader,Select, Button, Row, Statistic  } from 'antd';
import data from './data.js';
import data1 from './data1.js';
import data2 from './data2.js';
import LineGraph from './line.jsx';
import './linegraph.css';
import {getf} from './fetcher'
const { Option } = Select;

let list = [];
let newList = [];
let MyData = [];
const columns = [
	{
	  title: '省份',
	  dataIndex: 'province',
	  // here is that finding the name started with `value`
	  sorter: (a, b) => a.province.length - b.province.length,
	  sortDirections: ['descend'],
	},
	{
	  title: '流入',
	  dataIndex: 'in',
	  defaultSortOrder: 'descend',
	  sorter: (a, b) => a.in - b.in,
	},
	{
	  title: '流出',
	  dataIndex: 'out',
	  sorter: (a, b) => a.out - b.out,
	  sortDirections: ['descend', 'ascend'],
	},
  ];

class PopulationFlow extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			newList: [],
			linedata:data
		};
		getf().then((data) => {
			let provincesObj = [];
			let fuckData = data.data;
			console.log(fuckData);
			console.log(typeof(fuckData));
			for(const key in fuckData) {
				MyData.push(fuckData[key]);
			}
			console.log(MyData);
			console.log(typeof(MyData));
			MyData.forEach((item) => {
				if(!provincesObj[item.province])
					provincesObj[item.province] = {
						'province': item.province,
						"in": 0,
						"out": 0,
					};
				if(isNaN(item.in)) provincesObj[item.province].in = 0;
				else provincesObj[item.province].in = item.in;
				if(isNaN(item.out)) provincesObj[item.province].out = 0;
				else provincesObj[item.province].out = item.out;
			});

			let provinceList=[];

			for(const key in provincesObj) {
				provinceList.push(provincesObj[key]);
			}

			provinceList.sort((a, b)=>(b.in + b.out) - (a.in + a.out));
			console.log(typeof(provinceList));

			list=[];
			// eslint-disable-next-line array-callback-return
			provinceList.map((item) => {
				list.push({province : item.province, in : item.in, out : item.out});
				newList.push({name : item.province, value : item.in + item.out});
			});
			this.setState({
				list: list,
				newList: newList
			});
		});
	}
	onChange = (value) => {
		if( value%3==0){
		  this.setState({
			linedata:data
		  });
		}
		else if(value%3==1){
		  this.setState({
			linedata:data1
		  });
		}
		else{
			this.setState({
			  linedata:data2
			});
		};

	};

	render() {
		var line = this.state.linedata;
		if(this.state.list.length !== 0) {
			let temp = this.state.list;
			const myChart = echarts.init(document.getElementById('echartsmap'));
			myChart.showLoading();
			myChart.hideLoading();
			echarts.registerMap('China', geoJson);
			let option = {
				title: {
					text: '全国人口流动图',
					x: "center"
				},
				tooltip: {
					show: true,
					left: 'left',
					formatter(params) {
						let htmlString = params.name + '<br/>';
						for (let i = 0; i < temp.length; i++) {
							if (temp[i].province === params.name) {
								htmlString += '今日流入人口：' + temp[i].in + '<br/>';
								htmlString += '今日流出人口：' + temp[i].out;
								if (temp[i].in + temp[i].out > 2000) htmlString += '<br/>当前该地区人口流动情况复杂，请谨慎前往！';
								break;
							}
						}
						return htmlString;
					}
				},
				visualMap: {
					min: 0,
					max: 10000,
					left: 'left',
					top: 'bottom',
					text: ['多', '少'],
					inRange: {
						color: ['#F5deB3', '#880000']
					},
					show: true,
					calculable: true,
				},
				toolbox: {
					show: true,
					orient: 'vertical',
					left: 'right',
					top: 'center',
					feature: {
						dataView: {readOnly: true},
						restore: {},
						saveAsImage: {}
					}
				},
				series: [
					{
						name: '近14天各省、市、自治区、特别行政区人口流动情况',
						type: 'map',
						mapType: 'china',
						label: {
							show: true
						},
						zoom:1.2,
						data: this.state.newList
					}
				]
			};
			myChart.setOption(option);
		}
		return (
			<div>
				<div style = {{backgroundColor: "#fff"}}><br/><br/><br/><br/></div>
				<div id = "echartsmap" style = {{width: '100%', height: '80vh', backgroundColor: "#fff"}}/>
				<div style = {{backgroundColor: "#fff"}}><br/><br/><br/><br/></div>
				<Layout className="site-page-header-ghost-wrapper1" >
					<Layout className="site-layout-background" style={{paddingRight:"20px", paddingBottom:"10px"}}>
						<PageHeader
							ghost={false}
							title="各省市人口流动趋势"
							extra={[
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
									<Option value="1">北京</Option>
									<Option value="2">上海</Option>
									<Option value="3">天津</Option>
									<Option value="4">重庆</Option>
									<Option value="5">浙江</Option>
									<Option value="6">江苏</Option>
									<Option value="7">新疆</Option>
									<Option value="8">西藏</Option>
									<Option value="9">青海</Option>
									<Option value="10">四川</Option>
									<Option value="11">陕西</Option>
									<Option value="12">山西</Option>
									<Option value="13">贵州</Option>
									<Option value="14">云南</Option>
									<Option value="15">宁夏</Option>
									<Option value="16">广东</Option>
									<Option value="17">广西</Option>
									<Option value="18">海南</Option>
									<Option value="19">福建</Option>
									<Option value="20">安徽</Option>
									<Option value="21">黑龙江</Option>
									<Option value="22">辽宁</Option>
									<Option value="23">吉林</Option>
									<Option value="24">河北</Option>
									<Option value="25">江西</Option>
									<Option value="26">湖南</Option>
									<Option value="27">湖北</Option>
									<Option value="28">香港</Option>
									<Option value="29">台湾</Option>
									<Option value="30">内蒙古</Option>
									<Option value="31">山东</Option>
									<Option value="32">甘肃</Option>
									<Option value="33">澳门</Option>
								</Select>			
							]}
							>
						</PageHeader>				
					</Layout>
					<div style = {{backgroundColor: "#fff"}}><br/><br/><br/></div>	
					
					<Layout style={{ paddingBottom:"10px"}}>
						<LineGraph dates={line.dates} in={line.in} out={line.out} />
					</Layout>
				</Layout>	
				<Layout  className="site-page-header-ghost-wrapper2">
					<h1 align = "center">各省人口流动情况一览</h1>
					<Table columns={columns} dataSource={this.state.list} />
				</Layout>
			</div>
		);
	}
}

export default PopulationFlow