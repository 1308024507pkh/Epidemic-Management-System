import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, message } from "antd";
import MenuList from "../../component/Menu/MenuList";
import { Link } from "react-router-dom";
import { MenuData } from "./data";
import { BankOutlined, DownOutlined } from "@ant-design/icons";
import "./home.css";
import ContentIndex from "../../router/ContentIndex";
const { Header, Content } = Layout;

export const HomeIndex = (props) => {
  const [currentUser, setcurrentUser] = useState(null);
  /*
  function judeStoreUser() {
    const storageStr = localStorage.getItem("CURRENT_USER_NAME");
    if (storageStr && storageStr != "null") {
      setcurrentUser(JSON.parse(storageStr));
    } else {
      message.error("请登录！");
      props.history.push("/");
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
        <div  className="home-header-item">
          {React.createElement(BankOutlined)}
        </div>
        <span className="home-title">物资申领系统</span>
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
                key="user"
              >
                {currentUser != null ? currentUser.username : "无"}
                <DownOutlined />
              </Link>
            </Dropdown>
          </div>
        </div>
      </Header>
      <div className="home-content">
        <MenuList menuData={MenuData} />
        <Content className="home-main">
          <ContentIndex />
        </Content>
      </div>
    </div>
  );
};
