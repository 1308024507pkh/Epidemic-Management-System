import React, { useState, useEffect } from "react";
import "./index.css";
import { Form, Input, Select, Button, message } from "antd";
const { Option } = Select;
const { TextArea } = Input;

export default function FeedBack(props) {
  const [form] = Form.useForm();
  const [currentUser, setcurrentUser] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);
  const [content, setcontent] = useState("");
  async function onFinish(values) {
    let { content, email, phone } = values;
    let params = {
      email,
      phone,
      content,
      id: currentUser.id,
    };
    let updateRes = await window.$post("sys/suggest/save", params);
    if (updateRes.code == 0) {
      message.success("建议发送成功！");
    } else {
      message.error("建议发送失败！");
    }
  }
  /*function judeStoreUser() {
    const storageStr = localStorage.getItem("CURRENT_USER_NAME");
    if (storageStr && storageStr != "null") {
      let jsonparseData = JSON.parse(storageStr);
      let { email, phone } = jsonparseData;
      form.setFieldsValue({
        email,
        phone,
      });
      setcurrentUser(jsonparseData);
    } else {
      message.error("请登录！");
      props.history.push("/");
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
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        scrollToFirstError
      >
        <div
          style={{
            fontSize: 30,
            textAlign: "center",
            marginBottom: 20,
            marginTop: 40,
          }}
        >
          建议反馈信息填写
        </div>
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
          name="content"
          label="问题反馈"
          rules={[
            {
              required: true,
              message: "请输入问题或建议",
            },
          ]}
        >
          <TextArea
            rows={4}
            id="content"
            value={content}
            onChange={({ target }) => {
              setcontent(target.value);
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交反馈
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
