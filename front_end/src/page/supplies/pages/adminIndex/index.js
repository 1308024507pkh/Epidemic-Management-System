import React, { useEffect, useState } from "react";
import locale from 'antd/es/date-picker/locale/zh_CN';
import { DownloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
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
import moment from "moment";
function AdminIndex(props) {
  const { RangePicker } = DatePicker;
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const columns = [
    {
      title: "物资ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "物资名称",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "物资详情",
      key: "details",
      dataIndex: "details",
    },
    {
      title: "发布时间",
      key: "issueDate",
      dataIndex: "issueDate",
    },
    {
      title: "到期时间",
      key: "expireDate",
      dataIndex: "expireDate",
    },
    {
      title: "物资数量",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "状态",
      key: "isEnd",
      dataIndex: "isEnd",
      render: (text, record) => (
        <>
          <Button type="link">{text == 0 ? "未抽取" : "已抽取"}</Button>
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="link"
            disabled={record.isEnd == 0 ? false : true}
            onClick={() => {
              ExtractMaterials(record.id);
            }}
          >
            随机抽取中签
          </Button>
          <Button
            type="link"
            disabled={record.isEnd == 0 ? true : false}
            onClick={() => {
              ShowExtractMaterials(record.id);
              setIsWinDetail(true);
              setCurrentId(record.id);
            }}
          >
            查看中签信息
          </Button>
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

  const applyColums = [
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
  ];
  const startTime = moment(
    new Date().getTime() - 7 * 60 * 60 * 24 * 1000
  ).valueOf();
  const endTime = moment(new Date().getTime()).valueOf();
  const [IsModal, setIsModal] = useState(false);
  const [IsApplyDetail, setIsApplyDetail] = useState(false);
  const [MaterialsList, setMaterialsList] = useState([]);
  const [ApplyList, setApplyList] = useState([]);
  const [IsWinDetail, setIsWinDetail] = useState(false);
  const [QueryPageIndex, setQueryPageIndex] = useState(1);
  const [QueryTotalCount, setQueryTotalCount] = useState(0);
  const [CurrentWiners, setCurrentWiners] = useState([]);
  const [CurrentId, setCurrentId] = useState(null);
  async function onFinish(value) {
    let { details, quantity, title, expireDate } = value;
    expireDate = moment(expireDate).format("YYYY-MM-DD hh:mm:ss");
    let params = {
      details,
      quantity,
      title,
      expireDate,
    };
    let res = await window.$post("sys/materials/save", params);
    if (res.code == 0) {
      message.success("发布物资信息成功！");
      setIsModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      message.error("发布物资信息失败！");
    }
  }
  async function QueryMaterialsList(startDate, endDate) {
    let params = {
      startDate: startDate || startTime,
      endDate: endDate || endTime,
      page: QueryPageIndex,
      limit:10,
      order:"desc"
    };
    let res = await window.$get("sys/materials/list", params);
    if (res.code == 0) {
      setMaterialsList(res.page.list);
      setQueryPageIndex(res.page.currPage);
      setQueryTotalCount(res.page.totalCount);
    } else {
      message.error("查询物资列表失败！");
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
        DelMaterials(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  function submitTime(time) {
    let startDate = moment(time[0]).format("YYYY-MM-DD 00:00:00");
    let endDate = moment(time[1]).format("YYYY-MM-DD 24:00:00");
    let startTime = new Date(startDate);
    let endTime = new Date(endDate);
    QueryMaterialsList(startTime.getTime(), endTime.getTime());
  }
  async function DelMaterials(id) {
    let res = await window.$get("sys/materials/delete/" + id);
    if (res.code == 0) {
      message.success("删除成功！");
      setTimeout(() => {
        QueryMaterialsList();
      }, 2000);
    } else {
      message.success("删除失败！");
    }
  }
  async function ExportMaterials() {
    if (CurrentId != null) {
      let params = {
        materialsId: CurrentId,
      };
      let res = await window.$postDownload("sys/materials/export", params);
    }
  }
  async function ShowExtractMaterials(materialsId) {
    let params = {
      materialsId,
    };
    let res = await window.$post("sys/materials/extract", params);
    if (res.code == 0) {
      setCurrentWiners(res.list);
    } else {
      message.error("获取中签者详情失败！");
    }
  }
  async function ExtractMaterials(materialsId) {
    let params = {
      materialsId,
    };
    let res = await window.$post("sys/materials/extract", params);
    if (res.code == 0) {
      message.success("随机抽取成功！");
      setCurrentWiners(res.list);
      QueryMaterialsList();
    } else{
      message.error("随机抽取失败！");
    }
  }
  function disabledEndDate(current) {
    return current < moment();
  }
  useEffect(() => {
    QueryMaterialsList();
  }, [QueryPageIndex]);

  return (
    <div>
      <Card style={{ margin: 10 }} title="物资申领列表" hoverable>
        <div>
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            onClick={() => {
              setIsModal(true);
            }}
          >
            发布物资
          </Button>
          <RangePicker
          locale={locale}
            style={{ marginBottom: 20, marginLeft: 20 }}
            placeholder={["开始时间", "结束时间"]}
            onChange={submitTime}
          />
        </div>
        <Table
          columns={columns}
          dataSource={MaterialsList}
          pagination={false}
          style={{ marginBottom: "20px" }}
        />
        <Pagination
          defaultCurrent={QueryPageIndex}
          total={QueryTotalCount}
          showTotal={(total, range) => `共${total}条`}
        />
      </Card>

      {/* 发布物资 */}
      <Modal
        title="物资发布信息填写"
        visible={IsModal}
        footer={null}
        onCancel={() => {
          setIsModal(false);
        }}
        style={{ height: "20%" }}
      >
        <Form form={form} name="updateuser" onFinish={onFinish}>
          <Form.Item
            label="物资名称"
            name="title"
            rules={[{ required: true, message: "请填写物资名称!" }]}
          >
            <Input size="default" id="title" />
          </Form.Item>
          <Form.Item
            label="物资详情"
            name="details"
            rules={[{ required: true, message: "请填写物资详情!" }]}
          >
            <Input size="default" id="details" />
          </Form.Item>
          <Form.Item
            label="物资数量"
            name="quantity"
            rules={[{ required: true, message: "请填写物资数量!" }]}
          >
            <Input size="default" id="quantity" />
          </Form.Item>

          <Form.Item
            label="过期时间"
            name="expireDate"
            rules={[{ required: true, message: "请填写过期时间!" }]}
          >
            <DatePicker
             locale={locale}
              placeholder="过期时间"
              id="expireDate"
              disabledDate={disabledEndDate}
              showTime={{
                hideDisabledOptions: true,
              }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginRight: 25 }}
              onClick={() => {
                setIsModal(false);
              }}
            >
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 中签者人数详情 */}
      <Modal
        title="防疫专项物资中签者详情"
        visible={IsWinDetail}
        footer={null}
        style={{ marginRight: "10%" }}
        width="75%"
        onOk={() => {
          setIsWinDetail(false);
        }}
        onCancel={() => {
          setIsWinDetail(false);
        }}
      >
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          style={{ marginBottom: 15 }}
          onClick={() => {
            ExportMaterials();
          }}
        >
          导出
        </Button>
        <Table
          columns={applyColums}
          dataSource={CurrentWiners}
          pagination={false}
          style={{ marginBottom: "20px" }}
        />
        <Pagination
          defaultCurrent={1}
          total={CurrentWiners.length}
          showTotal={(total, range) => `共${total}条`}
        />
      </Modal>
    </div>
  );
}
export default AdminIndex;
