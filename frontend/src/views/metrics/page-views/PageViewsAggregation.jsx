import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchCount } from './actions'
import NumericalStatistic from '../../statistics/NumericalStatistic'

const PageViewsAggregation = props => (
  <NumericalStatistic
    info="A page view occurrs when a page is loaded by someone. A session may consist of several page views."
    label="# Page Views"
    value={props.count}
    fetchCount={props.fetchCount}
  />
)

PageViewsAggregation.propTypes = {
  count: PropTypes.any.isRequired,
  fetchCount: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const pageViewsState = applicationState.pageViews

  return {
    count: pageViewsState.get('count'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PageViewsAggregation)
