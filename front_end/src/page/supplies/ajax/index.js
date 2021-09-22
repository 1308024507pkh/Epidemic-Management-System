import axios from "axios";
import { message } from "antd";
axios.defaults.timeout = 10000;
let baseURL = "http://127.0.0.1:18080/";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url, {
        params: data,
      })
      .then((response) => {
        if (url == "code") {
          let blob = new Blob([response.data]);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function (e) {
            console.log(e);
          };
        }
        resolve(response.data);
      })
      .catch((err) => {
        message.error("请求失败请重试！");
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(baseURL + url, data).then(
      (response) => {
        if (response.data.code != 0) {
          if (response.data.msg == "SendFailedException: Invalid Addresses") {
            message.error("用户邮件地址填写错误，发送邮件失败！");
          } else {
            message.error(response.data.msg);
          }
          return;
        }
        console.log("成功返回值：", response);
        resolve(response.data);
      },
      (err) => {
        message.error("请求失败请重试！");
        reject(err);
      }
    );
  });
}

export function postDownload(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseURL + url,
      responseType: "arraybuffer",
      data: data,
    }).then(
      (response) => {
        let data = response.data;
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel",
        });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
          const a = document.createElement("a");
          a.download = `中签者详情表.xls`;
          a.href = e.target.result;
          a.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );
          window.URL.revokeObjectURL(blob);
        };
      },
      (err) => {
        message.error("请求出错,请重试！");
        reject(err);
      }
    );
  });
}
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(baseURL + url, data).then(
      (response) => {
        if (response.data.code != 0) {
          message.error(response.data.msg);
          return;
        }
        console.log("成功返回值：", response);
        resolve(response.data);
      },
      (err) => {
        message.error("请求失败请重试！");
        reject(err);
      }
    );
  });
}
