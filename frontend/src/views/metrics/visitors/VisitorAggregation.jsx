import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchCount } from './actions'
import NumericalStatistic from '../../statistics/NumericalStatistic'

const VisitorAggregation = props => (
  <NumericalStatistic
    info="A visitor is someone interacting with the website under a given time period."
    label="# Visitors"
    value={props.count}
    fetchCount={props.fetchCount}
  />
)

VisitorAggregation.propTypes = {
  count: PropTypes.any.isRequired,
  fetchCount: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const visitorState = applicationState.visitors

  return {
    count: visitorState.get('count'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitorAggregation)
