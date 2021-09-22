import React from 'react'
// 引入各组件
import User from "../../page/Users/User";
import Change from '../../page/Users/Change';
import Comment from '../../page/Users/Comment';
import Application from '../../page/Users/Application';
import SuperOperator from '../../page/Users/SuperOperator';

import PubNews from "../../page/news/PubNews";
import PubCases from "../../page/situation/PubCases";
import PubTrans from "../../page/transportation/PubTrans";
import PubAction from "../../page/resume/PubAction";
import PubFlow from "../../page/resume/PubFlow";

//引入路由
import {Route, Switch} from 'react-router-dom'

/**
 * 用户后台主体部分
 * 设置各子系统路由，默认显示用户信息页
 */
class Background extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/ESS/background/UserInfo' component={User}/>
					<Route exact path='/ESS/background/ChangeInfo' component={Change}/>
					<Route exact path='/ESS/background/Comments' component={Comment}/>
					<Route exact path='/ESS/background/Progress' component={Application}/>

					<Route exact path='/ESS/background/createadmin' component = {SuperOperator}/>
					<Route exact path='/ESS/background/News' component={PubNews}/>
					<Route exact path='/ESS/background/Cases' component={PubCases}/>
					<Route exact path='/ESS/background/transportation' component={PubTrans}/>
					<Route exact path='/ESS/background/resumeaction' component={PubAction}/>
                    <Route exact path='/ESS/background/populationflow' component={PubFlow}/>
				</Switch>
			</div>
		)
	}
}

export default Background