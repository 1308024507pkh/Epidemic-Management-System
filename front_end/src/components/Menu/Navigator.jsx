import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
// 导入icon
import { LineChartOutlined, AppstoreOutlined, NotificationOutlined, CarOutlined, SolutionOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;

/**
* 导航栏
*/
class Navi extends React.Component {
  render() {
    return (
      <Menu onClick={this.handleClick} mode="horizontal">
        <Menu.Item key="graph" icon={<LineChartOutlined />}> <Link to = '/ESS/situation'> 国内疫情 </Link></Menu.Item>
        <Menu.Item key="news" icon={<AppstoreOutlined />}> <Link to = '/ESS/news'> 疫情新闻 </Link> </Menu.Item>
        <SubMenu icon={<CarOutlined />} title="同乘交通自查">
          <Menu.ItemGroup>
            <Menu.Item key="transportation-shift"> <Link to = '/ESS/transportation/shift'> 班次 </Link> </Menu.Item>
            <Menu.Item key="transportation-flight"> <Link to = '/ESS/transportation/flight'> 航班 </Link> </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu icon={<NotificationOutlined />} title="复工情况">
          <Menu.ItemGroup>
            <Menu.Item key="action"> <Link to = '/ESS/resumeaction'> 各省复工举措 </Link> </Menu.Item>
            <Menu.Item key="flow"> <Link to = '/ESS/populationflow'> 全国人口流动图 </Link> </Menu.Item>
            <Menu.Item key="forum"> <Link to = '/ESS/forum'> 论坛答疑 </Link> </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
          <Menu.Item key="supplies" icon={<SolutionOutlined />} > <Link to = '/login'> 物资申领子系统 </Link> </Menu.Item>
      </Menu>
    );
  }
}

export default Navi