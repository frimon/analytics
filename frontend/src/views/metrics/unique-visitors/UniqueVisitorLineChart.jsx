import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from './actions'
import MetricLineChart from '../../charts/MetricLineChart'

const UniqueVisitorChart = props => (
  <MetricLineChart
    chartTitle="Unique Visitors"
    lineLabel="Unique Visitors"
    data={props.data}
    fetchData={props.fetchData}
  />
)

UniqueVisitorChart.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const uniqueVisitorState = applicationState.uniqueVisitors

  return {
    data: uniqueVisitorState.get('data').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UniqueVisitorChart)
