import {combineReducers} from 'redux'

import list from './list'
import user from './user'
import details from './details'

const Reducers = combineReducers({
  list,
  user,
  details
})
export default Reducers
