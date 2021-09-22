import { Menu } from "antd";
import React from "react";
import "./menu-list.css";
import { Link } from "react-router-dom";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const { SubMenu } = Menu;

export default function MenuList(props) {
  return (
    <Menu
      className="menu-list"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      inlineCollapsed={props.collapsed}
    >
      {props.menuData.map((item) => {
        return (
          <Menu.Item key={item.index}>
            <IconFont type={item.icon} />
            <Link to={item.urls} className="link" key={item.index}>
              {item.title}
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
