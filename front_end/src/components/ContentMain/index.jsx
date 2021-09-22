import React from 'react'
// 导入各子系统组件
import Situation from '../../page/situation/show/index'
import News from '../../page/news/index'
import CarCheck from '../../page/transportation/carcheck'
import FlightCheck from '../../page/transportation/flightcheck'
import PubTrains from '../../page/transportation/PubTrans'
import ResumeAction from '../../page/resume/resumeaction'
import PopulationFlow from '../../page/resume/flow'
import Forum from '../../page/resume/forum'
import LeftSider from '../Menu/Sider'
import SituationMoreInfo from '../../page/situation/situationMoreInfo/index'

//引入路由
import {Route, Switch,Redirect} from 'react-router-dom'

/**
 * 网页主体部分
 * 设置各子系统路由，默认将全国疫情地图作为首页
 */
class ContentMain extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/" exact render={() => <Redirect to="/ESS/situation" />}/>
					<Route exact path='/ESS/situation' component={Situation}/>
					<Route exact path='/ESS/situation/situationMoreInfo' component={SituationMoreInfo}/>
					<Route exact path='/ESS/news' component={News}/>
					<Route exact path='/ESS/transportation/shift' component={CarCheck}/>
					<Route exact path='/ESS/transportation/flight' component={FlightCheck}/>
					<Route exact path='/ESS/transportation/admin' component={PubTrains}/>
					<Route exact path='/ESS/resumeaction' component={ResumeAction}/>
                    <Route exact path='/ESS/populationflow' component={PopulationFlow}/>
					<Route exact path='/ESS/forum' component={Forum}/>
					<Route path='/ESS/background' component={LeftSider}/>
				</Switch>
			</div>
		)
	}
}

export default ContentMain