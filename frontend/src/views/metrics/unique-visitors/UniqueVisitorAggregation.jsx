import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchCount } from './actions'
import NumericalStatistic from '../../statistics/NumericalStatistic'

const UniqueVisitorAggregation = props => (
  <NumericalStatistic
    info="A unique visitor is someone visiting the site from a certain device and may have several visits."
    label="# Unique Visitors"
    value={props.count}
    fetchCount={props.fetchCount}
  />
)

UniqueVisitorAggregation.propTypes = {
  count: PropTypes.any.isRequired,
  fetchCount: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const uniqueVisitorState = applicationState.uniqueVisitors

  return {
    count: uniqueVisitorState.get('count'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UniqueVisitorAggregation)
