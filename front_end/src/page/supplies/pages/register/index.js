import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  ContactsOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import CanvasBack from "../../component/CanvasBack/index.js";
import LogoImg from "../logo.png";
import "./index.less";
const RegisterIndex = (props) => {
  const validateMessages = {
    required: "改项必填！",
    types: {
      email: "邮箱格式错误，请重新输入！",
      number: "数字格式错误，请重新输入！",
    },
    number: {
      range: "超过最大长度",
    },
  };
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [idcard, setidcard] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [username, setusername] = useState("");
  const [userpwd, setuserpwd] = useState("");
  const [role, setrole] = useState("user");
  const [form] = Form.useForm();
  async function onFinish(value) {
    let { address, username, name, phone, email, userpwd, idcard } = value;
    let params = {
      address,
      username,
      name,
      phone,
      email,
      userpwd,
      idcard,
      role,
    };
    let registerRes = await window.$post("sys/user/save", params);
    if (registerRes.code == 0) {
      message.success("注册成功！");
      setTimeout(() => {
        props.history.push("/login");
      }, 2000);
    } else {
      message.error("注册失败，请重试！");
    }
    // console.log(registerRes);
  }
  return (
    <div className="page-register">
      <div className="canvasBox">
        <CanvasBack row={12} col={8} />
      </div>
      <div className="registerBox show">
        <Form
          validateMessages={validateMessages}
          form={form}
          name="register"
          onFinish={onFinish}
        >
          <div className="title">
            <img src={LogoImg} alt="logo" />
            <span>物资申领系统-注册</span>
          </div>
          <div>
            <Form.Item
              name="username"
              rules={[
                { max: 12, message: "最大长度为12位字符" },
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input
                prefix={<TeamOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="username"
                value={username}
                onChange={({target})=>{setusername(target.value)}}
                placeholder="请输入用户名"
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                { max: 12, message: "最大长度为12位字符" },
                {
                  required: true,
                  whitespace: true,
                  message: "请输入真实姓名",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="name"
                value={name}
                onChange={({target})=>{setname(target.value)}}
                placeholder="请输入真实姓名"
              />
            </Form.Item>

            <Form.Item
              name="idcard"
              rules={[
                { max: 40, message: "最大长度为40位字符" },
                {
                  required: true,
                  whitespace: true,
                  message: "请输入身份证号",
                },
              ]}
            >
              <Input
                prefix={<ContactsOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="idcard"
                value={idcard}
                onChange={({target})=>{setidcard(target.value)}}
                placeholder="请输入身份证号"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                { max: 11, message: "最大长度为11位字符" },
                {
                  required: true,
                  whitespace: true,
                  message: "请输入手机号",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="phone"
                value={phone}
                onChange={({target})=>{setphone(target.value)}}
                placeholder="请输入手机号"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "请正确填写邮箱格式",
                },
                {
                  required: true,
                  message: "请填写邮箱地址",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="email"
                value={email}
                onChange={({target})=>{setemail(target.value)}}
                placeholder="请输入邮箱"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                { max: 40, message: "最大长度为40位字符" },
                {
                  required: true,
                  whitespace: true,
                  message: "请输入住宅地址",
                },
              ]}
            >
              <Input
                prefix={<EnvironmentOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="address"
                value={address}
                onChange={({target})=>{setaddress(target.value)}}
                placeholder="请输入住宅地址"
              />
            </Form.Item>
            <Form.Item
              name="userpwd"
              rules={[
                { required: true, message: "请输入密码" },
                { max: 18, message: "最大长度18个字符" },
              ]}
            >
              <Input
                prefix={<KeyOutlined style={{ fontSize: 13 }} />}
                size="large"
                type="password"
                value={userpwd}
                onChange={({target})=>{setuserpwd(target.value)}}
                placeholder="请输入密码"
              />
            </Form.Item>
            <div className="register-btn-box">
              <a
                onClick={() => {
                  props.history.push("/login");
                }}
              >
                已有账号，去登录
              </a>
              <div>
                <Button
                  className="submit-btn"
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  注册
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export const Register = withRouter(RegisterIndex);
