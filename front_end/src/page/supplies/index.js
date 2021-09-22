import React from "react";
import "./index.css";
import RouterIndex from "./router";
import moment from "moment";
import "moment/locale/zh-cn";
import {post,get,put,postDownload} from "./ajax/index";
import {BrowserRouter, Route,Switch} from 'react-router-dom';
window.$post=post;
window.$get=get;
window.$put=put;
window.$baseurl="http://127.0.0.1:18080/"
window.$postDownload=postDownload
moment.locale("zh-cn");


class Supplies extends React.Component {
	render() {
		return (
		<BrowserRouter>
			<RouterIndex />
		</BrowserRouter>
		)
	}
}
export default Supplies


