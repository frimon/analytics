import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LineChart from '../../charts/LineChart'
import { fetchData } from './actions'
import { transformData } from '../../helpers/googleChartHelpers'

const UniqueVisitorLineChart = (props) => {
  const axisType = props.unit === 'hour' ? 'datetime' : 'date'
  const horizontalAxis = { type: axisType, label: 'Day' }
  const lineLabel = 'Unique Visitors'
  const plotData = transformData(props.data, horizontalAxis, [lineLabel])

  return (
    <LineChart
      chartType="LineChart"
      chartName=""
      height="300px"
      data={plotData}
      unit={props.unit}
      fetchData={props.fetchData}
      fromDate={props.fromDate}
      toDate={props.toDate}
      options={{
        title: 'Unique Visitors',
      }}
    />
  )
}

UniqueVisitorLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  unit: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const uniqueVisitorState = applicationState.uniqueVisitors
  const globalState = applicationState.global

  return {
    data: uniqueVisitorState.get('data').toJS(),
    unit: globalState.get('unit'),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UniqueVisitorLineChart)
