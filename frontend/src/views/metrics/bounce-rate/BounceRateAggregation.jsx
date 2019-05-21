import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { fetchCount } from './actions'
import NumericalStatistic from '../../statistics/NumericalStatistic'

const BounceRateAggregation = props => (
  <NumericalStatistic
    info="Bounce rate is the percentage of visitors to a particular website who navigate away from the site after viewing only one page. A high bounce rate can occur if your users find your content non-satisfactory."
    label="Bounce Rate"
    value={numeral(props.average).format('0.0%')}
    fetchCount={props.fetchCount}
  />
)

BounceRateAggregation.propTypes = {
  average: PropTypes.any.isRequired,
  fetchCount: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const bounceRateState = applicationState.bounceRate

  return {
    average: bounceRateState.get('average'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BounceRateAggregation)
