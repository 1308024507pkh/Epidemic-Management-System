import React, { useEffect, useState } from "react";
import { Card, Button, Table, message, Pagination,Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const AdminFeedbackForm = () => {
  const { confirm } = Modal;

  const columns = [
    {
      title: "建议id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "手机号",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "邮箱",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "时间",
      key: "createdTime",
      dataIndex: "createdTime",
    },
    {
      title: "反馈内容",
      key: "content",
      dataIndex: "content",
    },

    {
      title: "操作",
      key: "action",
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
  const [SuggestList, setSuggestList] = useState([]);
  const [PageIndex, setPageIndex] = useState(1);
  const [TotalCount, setTotalCount] = useState(0);
  async function getAllSuggestList() {
    let params = {
      page: PageIndex,
      limit:10,
      order:"desc"
    };
    let res = await window.$get("sys/suggest/list", params);
    if (res.code == 0) {
      setSuggestList(res.page.list);
      setPageIndex(res.page.currPage);
      setTotalCount(res.page.totalCount);
    } else {
      message.error("获取反馈列表失败！");
    }
  }
  async function delSuggest(id) {
    let res = await window.$get("sys/suggest/delete/"+id);
    if (res.code == 0) {
      message.success("删除成功！");
      getAllSuggestList();
    } else {
      message.error("删除失败！");
    }
  }
  function showDeleteConfirm(id) {
    confirm({
      title: "确定删该条信息?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        delSuggest(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  useEffect(() => {
    getAllSuggestList();
  }, [PageIndex]);
  return (
    <>
      <Card style={{ margin: 10 }} title="历史反馈记录" hoverable>
        <Table
          columns={columns}
          dataSource={SuggestList}
          pagination={false}
          style={{ marginBottom: "20px" }}
        />
        <Pagination
          defaultCurrent={PageIndex}
          total={TotalCount}
          showTotal={(total, range) => `共${total}条`}
          onChange={(page, size) => {
            setPageIndex(page);
          }}
        />
      </Card>
    </>
  );
};

export default function AdminFeedback() {
  return (
    <div>
      <AdminFeedbackForm />
    </div>
  );
}
