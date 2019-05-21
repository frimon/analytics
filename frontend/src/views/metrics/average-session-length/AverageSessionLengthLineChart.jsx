import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from './actions'
import MetricLineChart from '../../charts/MetricLineChart'

const AverageSessionLengthLineChart = props => (
  <MetricLineChart
    chartTitle="Average Session Length (seconds)"
    lineLabel="Average Session Length"
    data={props.data}
    fetchData={props.fetchData}
  />
)

AverageSessionLengthLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const averageSessionLengthState = applicationState.averageSessionLength

  return {
    data: averageSessionLengthState.get('data').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AverageSessionLengthLineChart)
