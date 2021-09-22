import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, message } from "antd";
import MenuList from "../../component/Menu/MenuList";
import { Link } from "react-router-dom";
import { MenuData } from "./data";
import {
  BankOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./home.css";
import ContentIndex from "../../router/ContentIndex";
const { Header, Content } = Layout;
export const AdminHomeIndex = (props) => {
  const [currentUser, setcurrentUser] = useState(null);
  /*function judeStoreUser() {
    const storageStr = localStorage.getItem("CURRENT_USER_NAME");
    if (storageStr && storageStr != "null") {
      let jsonparseData = JSON.parse(storageStr);
      if (jsonparseData.role != "admin") {
        message.error("没有权限查看管理员界面,请使用管理员账号登录");
        props.history.push("/adminlogin");
        return;
      }
      setcurrentUser(jsonparseData);
    } else {
      message.error("请登录！");
      props.history.push("/adminlogin");
      return;
    }
  }*/
  function loginOut() {
    localStorage.setItem("CURRENT_USER_NAME", null);
    props.history.push("/");
  }
  useEffect(() => {
    //judeStoreUser();
  }, []);
  return (
    <div>
      <Header className="home-header">
        <div className="home-header-item">
          {React.createElement(BankOutlined)}
        </div>
        <span className="home-title">物资申领管理系统</span>
        <div className="header-right">
          <div className="home-header-menu">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a
                      onClick={() => {
                        loginOut();
                      }}
                    >
                      退出
                    </a>
                  </Menu.Item>
                </Menu>
              }
            >
              <Link
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {currentUser != null ? currentUser.username : "无"}{" "}
                <DownOutlined />
              </Link>
            </Dropdown>
          </div>
        </div>
      </Header>
      <div className="home-content">
        <MenuList menuData={MenuData}  />
        <Content className="home-main">
          <ContentIndex />
        </Content>
      </div>
    </div>
  );
};
