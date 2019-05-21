import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from './actions'
import MetricLineChart from '../../charts/MetricLineChart'

const BounceRateLineChart = props => (
  <MetricLineChart
    chartTitle="Bounce Rate"
    lineLabel="Bounce Rate"
    data={props.data}
    fetchData={props.fetchData}
  />
)

BounceRateLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const bounceRateState = applicationState.bounceRate

  return {
    data: bounceRateState.get('data').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(BounceRateLineChart)
