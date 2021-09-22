import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Table,
  Pagination,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
function AdminUserInfoIndex(props) {
  const { RangePicker } = DatePicker;
  const { confirm } = Modal;
  function showDeleteConfirm(id) {
    confirm({
      title: "确定删该条信息?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        delUser(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  const UserColums = [
    {
      title: "用户名",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "真实姓名",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "身份证号",
      key: "idcard",
      dataIndex: "idcard",
    },
    {
      title: "手机号",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "邮箱地址",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "住宅地址",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "操作",
      key: "operation",
      render: (text, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              showDeleteConfirm(record.id);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
  const [UserList, setUserList] = useState([]);
  const [TotalCount, setTotalCount] = useState(0);
  const [PageIndex, setPageIndex] = useState(1);
  async function getAllUserInfo() {
    let params = {
      page: PageIndex,
      limit:10,
      order:"asc"
    };
    let res = await window.$get("sys/user/list", params);
    if (res.code == 0) {
      let list = res.page.list;
      let FilterList = list.filter((item) => {
        return item.role != "admin";
      });
      setUserList(FilterList);
      setTotalCount(res.page.totalCount - 1);
      setPageIndex(res.page.currPage);
    } else {
      message.error("获取用户信息失败！");
    }
  }
  async function delUser(id) {
   
    let res = await window.$get("sys/user/delete/"+id);
    if (res.code == 0) {
      message.success("删除改用户信息成功！");
      getAllUserInfo();
    } else {
      message.error("删除改用户信息失败！");
    }
  }
  useEffect(() => {
    getAllUserInfo();
  }, []);
  return (
    <div>
      <Card style={{ margin: 10 }} title="用户信息列表" hoverable>
        <Table
          columns={UserColums}
          dataSource={UserList}
          pagination={false}
          style={{ marginBottom: "20px" }}
        />
        <Pagination
          defaultCurrent={PageIndex}
          total={TotalCount}
          showTotal={(total, range) => `共${total}条`}
          onCancel={(page, pageSize) => {
            setPageIndex(page);
          }}
        />
      </Card>
    </div>
  );
}
export default AdminUserInfoIndex;
