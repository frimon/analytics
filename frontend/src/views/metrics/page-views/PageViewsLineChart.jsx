import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from './actions'
import MetricLineChart from '../../charts/MetricLineChart'

const PageViewsLineChart = props => (
  <MetricLineChart
    chartTitle="Page Views"
    lineLabel="Page Views"
    data={props.data}
    fetchData={props.fetchData}
  />
)

PageViewsLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const pageViewsState = applicationState.pageViews

  return {
    data: pageViewsState.get('data').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PageViewsLineChart)
