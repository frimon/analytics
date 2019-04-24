import { combineReducers } from 'redux'
import global from './views/reducer'
import index from './views/index/reducer'
import visitors from './views/charts/visitors/reducer'

export default combineReducers({
  global,
  index,
  visitors,
})
