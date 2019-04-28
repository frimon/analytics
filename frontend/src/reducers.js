import { combineReducers } from 'redux'
import global from './views/reducer'
import index from './views/overview/reducer'
import visitors from './views/visitors/reducer'
import uniqueVisitors from './views/unique-visitors/reducer'
import pageViews from './views/page-views/reducer'

export default combineReducers({
  global,
  index,
  visitors,
  uniqueVisitors,
  pageViews,
})
