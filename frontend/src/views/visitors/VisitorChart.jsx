import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MetricChart from './MetricChart'
import { fetchData } from '../metrics/visitors/actions'
import { transformData } from '../helpers/googleChartHelpers'
import LineChart from './LineChart'

class VisitorChart extends MetricChart {
  render() {
    const axisType = this.props.unit === 'hour' ? 'datetime' : 'date'
    const horizontalAxis = { type: axisType, label: 'Day' }
    const lineLabel = 'Visitors'
    const plotData = transformData(this.props.data, horizontalAxis, [lineLabel])

    return (
      <LineChart
        data={plotData}
        height="300px"
        options={{
          title: 'Visitors',
        }}
      />
    )
  }
}

function mapStateToProps(applicationState) {
  const visitorState = applicationState.visitors
  const globalState = applicationState.global

  return {
    data: visitorState.get('data').toJS(),
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


export default connect(mapStateToProps, mapDispatchToProps)(VisitorChart)
