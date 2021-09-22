import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Menu,  Row, Col,Avatar, Layout, PageHeader } from 'antd';
import Background from "../Background/index";
import { UserOutlined, NotificationOutlined } from '@ant-design/icons';
import {backendUrl} from "../../page/Users/Common";
const { SubMenu } = Menu;
var storage=window.localStorage;

/**
* 用户后台的侧边栏
*/
class LeftSider extends React.Component {
    // 获取用户权限，根据用户权限显示/隐藏部分页面
    constructor(props){
        super(props);
        this.state = {
            Super: false,
            admin_1: false,
            admin_2: false,
            admin_3: false,
            admin_4: false,
            admin_5: false,
            //PermissionLevel:[0,0,0,0,0,0,0], 0：超级管理员，1-5分别是四个子系统的管理员，6是普通用户
        }

        if(storage.hasOwnProperty("username")){
            var name  = storage.getItem("username");
            this.state ={
                isLoggedIn: true,
                UserName : name
            }
        }
        else {
            this.state = {
                isLoggedIn: false,
                UserName:"未登录"
            }
        }
    }


    componentWillMount(){
        fetch(backendUrl+"user/profile/",{
            method:"get",
            mode:"cors",
            credentials:"include",
            headers:{
                sessionid: storage.getItem("sessionid")
            }
        })
            .then(res => res.json())
            .then((result)=>{
                var group = result.groups;

                for(var i=0;i<group.length;i++){
                    if(group[i] === "SuperAdmin"){
                        this.setState = ({
                            Super: true
                        })
                    }
                    else if(group[i] === "admin_1"){
                        this.setState({
                           admin_1: true
                        })
                    }
                    else if(group[i] === "admin_2"){
                        this.setState({
                            admin_2: true
                        })
                    }
                    else if(group[i] === "admin_3"){
                        this.setState({
                            admin_3:true
                        })
                    }
                    else if(group[i] === "admin_4"){
                        this.setState({
                            admin_4: true
                        })
                    }
                    else if(group[i] === "admin_5"){
                        this.setState({
                            admin_5: true
                        })
                    }
                }
                
                /*this.setState({
                    PermissionLevel:group
                })*/

            },
            (error)=>{
                console.log(error);
            })
    }

	render() {       
        if(this.state.isLoggedIn === true){
		return(
        <Row>
            <Col span={4}>
            <Layout className="site-page-header-ghost-wrapper" >
				<PageHeader ghost={false}  title={"Hello，"+ this.state.UserName}>
				</PageHeader>						
			</Layout>
            <div>
            <Menu mode="inline" defaultSelectedKeys={["UserInfo"]} defaultOpenKeys={["User","Public"]} style={{ height: '100%', borderRight: 0 }}>
                <SubMenu key = "User" icon ={<UserOutlined />} title="用户信息">
                    <Menu.ItemGroup>
                        <Menu.Item key="UserInfo" > <Link to = '/ESS/background/UserInfo'> 用户信息 </Link></Menu.Item>
                        <Menu.Item key="ChangeInfo" > <Link to = '/ESS/background/ChangeInfo'> 修改信息 </Link></Menu.Item>
                        <Menu.Item key="Comments" > <Link to = '/ESS/background/Comments'> 我的评论 </Link></Menu.Item>
                        <Menu.Item key="Progress" > <Link to = '/ESS/background/Progress'> 物资申请进度 </Link></Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                {
                    this.state.Super === true ?(<Menu.Item key="SuperAdmin"> <Link to = '/ESS/background/createadmin'> 建立管理员账户 </Link></Menu.Item>):(<div/>)
                }
                {
                    this.state.admin_1 === true ?(<Menu.Item key="News"> <Link to = '/ESS/background/News'> 疫情新闻发布 </Link></Menu.Item>):(<div/>)
                }
                {
                    this.state.admin_3 === true ?(<Menu.Item key="Cases"> <Link to ={{
                        pathname: '/ESS/background/Cases',
						state: {
							province: this.state.province
						}
                    }}> 病例监测信息发布 </Link> </Menu.Item>):(<div/>)
                }
                {
                    this.state.admin_2 === true ?(<Menu.Item key="Transportation"> <Link to = '/ESS/background/transportation'> 高危列车/航班信息发布 </Link></Menu.Item>):(<div/>)
                }
                {
                    this.state.admin_5 === true ?(
                        <SubMenu key = "public" icon = {<NotificationOutlined/>} title = "信息发布">
                            <Menu.Item key="ResumeAction"> <Link to = '/ESS/background/resumeaction'> 复工举措发布 </Link></Menu.Item>
                            <Menu.Item key="PopFlow"> <Link to = '/ESS/background/populationflow'> 人口流动信息发布 </Link></Menu.Item>
                        </SubMenu>
                    ):(<div/>)
                }
            </Menu>
            </div>
            </Col>
            <Col span = {20}>
                <Background />
            </Col>
        </Row>
        );
        }
        else{
            return <Redirect to = "/LoginIn" />
        }
	}
}

export default LeftSider