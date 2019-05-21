import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { fetchCount } from './actions'
import NumericalStatistic from '../../statistics/NumericalStatistic'

const AverageSessionAggregation = props => (
  <NumericalStatistic
    info="A session is defined as a group of interactions one user takes within a given time frame on your website. This metric tells you how long a session is on an average."
    label="Avg. session length (seconds)"
    value={numeral(props.average).format('0.0a')}
    fetchCount={props.fetchCount}
  />
)

AverageSessionAggregation.propTypes = {
  average: PropTypes.any.isRequired,
  fetchCount: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const averageSessionLengthState = applicationState.averageSessionLength

  return {
    average: averageSessionLengthState.get('average'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AverageSessionAggregation)
