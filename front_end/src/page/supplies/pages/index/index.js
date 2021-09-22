import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Tag,
  Table,
  Pagination,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
} from "antd";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";

function Index(props) {
  const { RangePicker } = DatePicker;
  const columns = [
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
      title: "状态",
      key: "expireDate",
      dataIndex: "expireDate",
      render: (text, record) => (
        <>
          <span>
            {new Date(text).getTime() <= new Date().getTime()
              ? "已过期, 不可申领"
              : JudeStatus(record.id) == true
              ? "可申领"
              : "已申领, 待发货"}
          </span>
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
            disabled={
              new Date(record.expireDate).getTime() > new Date().getTime() &&
              JudeStatus(record.id) == true
                ? false
                : true
            }
            onClick={() => {
              AppleMaterials(record.id);
            }}
          >
            申请领用
          </Button>
        </>
      ),
    },
  ];

  const startTime = moment(
    new Date().getTime() - 7 * 60 * 60 * 24 * 1000
  ).valueOf();
  const endTime = moment(new Date().getTime()).valueOf();
  const [IsModal, setIsModal] = useState(false);
  const [ListData, setListData] = useState([]);
  const [TotalCount, setTotalCount] = useState(0);
  const [PageIndex, setPageIndex] = useState(1);
  const submitSuccess = () => {
    setIsModal(false);
  };
  const submitCancel = () => {
    setIsModal(false);
  };
  async function QueryMaterialsList(startDate, endDate) {
    let params = {
      startDate: startDate || startTime,
      endDate: endDate || endTime,
      page: PageIndex,
      limit: 10,
      order: "desc",
    };
    let res = await window.$get("sys/materials/list", params);
    if (res.code == 0) {
      setListData(res.page.list);
      setPageIndex(res.page.currPage);
      setTotalCount(res.page.totalCount);
    } else {
      message.error("查询物资列表失败！");
    }
  }
  function submitTime(time) {
    let startDate = moment(time[0]).format("YYYY-MM-DD 00:00:00");
    let endDate = moment(time[1]).format("YYYY-MM-DD 24:00:00");
    let startTime = new Date(startDate);
    let endTime = new Date(endDate);
    QueryMaterialsList(startTime.getTime(), endTime.getTime());
  }
  async function AppleMaterials(materialsId) {
    let CurrentUser = JSON.parse(localStorage.getItem("CURRENT_USER_NAME"));
    let temobj = { userid: CurrentUser.id, materialsId: materialsId };
    let getStorage = JSON.parse(
      localStorage.getItem("CURRENT_APPLY_List")
        ? localStorage.getItem("CURRENT_APPLY_List")
        : "[]"
    );
    getStorage.push(temobj);
    localStorage.setItem("CURRENT_APPLY_List", JSON.stringify(getStorage));
    let params = {
      materialsId,
      userId: CurrentUser.id,
    };
    let res = await window.$put("sys/materials/apply", params);
    if (res.code == 0) {
      message.success("申领该物资成功！");
      QueryMaterialsList();
    } else {
      message.error("申领该物资失败！");
    }
  }
  function JudeStatus(materialsId) {
    let ids = localStorage.getItem("CURRENT_APPLY_List");
    let CurrentUser = JSON.parse(localStorage.getItem("CURRENT_USER_NAME"));
    if (ids) {
      let applylist = JSON.parse(ids);
      let finfarr = applylist.find((item) => {
        return item.materialsId == materialsId && CurrentUser.id == item.userid;
      });
      if (finfarr) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  useEffect(() => {
    QueryMaterialsList();
  }, [PageIndex]);

  return (
    <div>
      <Card style={{ margin: 10 }} title="物资申领列表" hoverable>
        <RangePicker
          locale={locale}
          style={{ marginBottom: 20 }}
          placeholder={["发布时间", "到期时间"]}
          onChange={submitTime}
        />
        <Table
          columns={columns}
          dataSource={ListData}
          pagination={false}
          style={{ marginBottom: "20px" }}
        />
        <Pagination
          defaultCurrent={PageIndex}
          total={TotalCount}
          showTotal={(total, range) => `共${total}条`}
          onChange={(page, pageSize) => {
            setPageIndex(page);
          }}
        />
      </Card>
      <Modal
        title="物资申领信息填写"
        visible={IsModal}
        onOk={submitSuccess}
        onCancel={submitCancel}
      >
        <Form>
          <Form.Item
            label="真实姓名"
            name="username"
            rules={[{ required: true, message: "请填写真实姓名!" }]}
          >
            <Input size="default" />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name="cardID"
            rules={[{ required: true, message: "请填写身份证号!" }]}
          >
            <Input size="default" />
          </Form.Item>
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[{ required: true, message: "请填写手机号码!" }]}
          >
            <Input size="default" />
          </Form.Item>
          <Form.Item
            label="住宅地址"
            name="address"
            rules={[{ required: true, message: "请填写住宅地址!" }]}
          >
            <Input size="default" />
          </Form.Item>

          <Form.Item
            label="邮箱地址"
            name="email"
            rules={[{ required: true, message: "请填写邮箱地址!" }]}
          >
            <Input size="default" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default Index;
