import { combineReducers } from 'redux'
import global from './views/reducer'
import index from './views/overview/reducer'
import visitors from './views/visitors/reducer'
import uniqueVisitors from './views/unique-visitors/reducer'
import pageViews from './views/page-views/reducer'
import averageSessionLength from './views/average-session-length/reducer'
import bounceRate from './views/bounce-rate/reducer'
import events from './views/events/reducer'

export default combineReducers({
  global,
  index,
  visitors,
  uniqueVisitors,
  pageViews,
  averageSessionLength,
  bounceRate,
  events,
})
