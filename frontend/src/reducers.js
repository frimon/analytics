import { combineReducers } from 'redux'
import global from './views/reducer'
import index from './views/overview/reducer'
import visitors from './views/metrics/visitors/reducer'
import uniqueVisitors from './views/metrics/unique-visitors/reducer'
import pageViews from './views/metrics/page-views/reducer'
import averageSessionLength from './views/metrics/average-session-length/reducer'
import bounceRate from './views/metrics/bounce-rate/reducer'
import events from './views/metrics/events/reducer'

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
