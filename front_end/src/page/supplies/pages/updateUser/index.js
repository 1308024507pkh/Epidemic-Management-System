import React, { useState, useEffect } from "react";
import "./index.css";
import { Form, Input, Select, Button, message } from "antd";
const { Option } = Select;
const { TextArea } = Input;

export default function UpdateUser(props) {
  const [form] = Form.useForm();
  const [currentUser, setcurrentUser] = useState(null);
  const [address, setaddress] = useState(null);
  const [email, setemail] = useState(null);
  const [idcard, setidcard] = useState(null);
  const [name, setname] = useState(null);
  const [phone, setphone] = useState(null);
  const [username, setusername] = useState(null);
  const [userpwd, setuserpwd] = useState(null);
  async function queryUser() {
    let queryRes = await window.$get(`/sys/user/info/${currentUser.id}`);
    if (queryRes.code == 0) {
      localStorage.setItem("CURRENT_USER_NAME", JSON.stringify(queryRes.user));
    }
  }
  async function onFinish(values) {
    let { address, email, idcard, name, phone, username, userpwd } = values;
    let params = {
      address,
      email,
      idcard,
      name,
      phone,
      username,
      userpwd,
      id: currentUser.id,
    };
    let updateRes = await window.$put("sys/user/update", params);
    if (updateRes.code == 0) {
      message.success("更新个人信息成功！");
      await queryUser();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      message.error("更新个人信息失败！");
    }
  }
  /*function judeStoreUser() {
    const storageStr = localStorage.getItem("CURRENT_USER_NAME");
    if (storageStr && storageStr != "null") {
      let jsonparseData = JSON.parse(storageStr);
      let {
        address,
        email,
        idcard,
        name,
        phone,
        username,
        userpwd,
      } = jsonparseData;
      form.setFieldsValue({
        address,
        email,
        idcard,
        name,
        phone,
        username,
        userpwd,
      });
      setcurrentUser(jsonparseData);
    } else {
      message.error("请登录！");
      props.history.push("/");
      return;
    }
  }*/
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  useEffect(() => {
    //judeStoreUser();
  }, []);
  return (
    <div>
      <Form
        className="feedback-form"
        form={form}
        name="updateuser"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
      >
        <div
          style={{
            fontSize: 30,
            textAlign: "center",
            marginBottom: 20,
            marginTop: 40,
          }}
        >
          个人信息修改
        </div>
        <Form.Item
          name="username"
          label="用户名称"
          rules={[
            {
              required: true,
              message: "请输入你的用户名",
            },
          ]}
        >
          <Input
            id="username"
            value={username}
            onChange={({ target }) => {
              setusername(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="真实姓名"
          rules={[
            {
              required: true,
              message: "请输入你的真实姓名",
            },
          ]}
        >
          <Input
            id="name"
            value={name}
            onChange={({ target }) => {
              setname(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="idcard"
          label="身份证号"
          rules={[
            {
              required: true,
              message: "请输入你的身份证号",
            },
          ]}
        >
          <Input
            id="idcard"
            value={idcard}
            onChange={({ target }) => {
              setidcard(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[
            {
              required: true,
              message: "请输入手机号码！",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
            id="phone"
            value={phone}
            onChange={({ target }) => {
              setphone(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="住宅地址"
          rules={[
            {
              required: true,
              message: "请输入你的住宅地址",
            },
          ]}
        >
          <Input
            id="address"
            value={address}
            onChange={({ target }) => {
              setaddress(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱地址"
          rules={[
            {
              type: "email",
              message: "您输入的E-mail的格式不正确!",
            },
            {
              required: true,
              message: "请输入你的E-mail!",
            },
          ]}
        >
          <Input
            id="email"
            value={email}
            onChange={({ target }) => {
              setemail(target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="userpwd"
          label="登录密码"
          rules={[
            {
              required: true,
              message: "请输入你的登录密码!",
            },
          ]}
        >
          <Input
            id="userpwd"
            type="password"
            value={userpwd}
            onChange={({ target }) => {
              setuserpwd(target.value);
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交修改
          </Button>
        </Form.Item>
      </Form>
   
   
    </div>
  );
}
