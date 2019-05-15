import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from './actions'
import MetricLineChart from '../../charts/MetricLineChart'

const VisitorLineChart = props => (
  <MetricLineChart
    chartTitle="Visitors"
    lineLabel="Visitors"
    data={props.data}
    fetchData={props.fetchData}
  />
)

VisitorLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const visitorState = applicationState.visitors

  return {
    data: visitorState.get('data').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(VisitorLineChart)
