import React, {Component} from 'react';

//布局组件
import Menu from "../Menu/Menu";//导航
import ContentMain from "../ContentMain/index";//主题

/**
 * 网页主体
 */
class Main extends Component {
	render() {
		return (
			<div>
				<Menu />
				<ContentMain/>
			</div>
		);
	}
}
export default Main;