import { combineReducers } from 'redux'
import global from './views/reducer'
import index from './views/index/reducer'

export default combineReducers({
  global,
  index,
})
