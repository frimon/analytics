import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from './actions'
import { transformData } from '../../helpers/googleChartHelpers'
import MetricChart from '../../charts/MetricChart'
import LineChart from '../../charts/LineChart'

class UniqueVisitorChart extends MetricChart {
  render() {
    const axisType = this.props.unit === 'hour' ? 'datetime' : 'date'
    const horizontalAxis = { type: axisType, label: 'Day' }
    const lineLabel = 'Unique Visitors'
    const plotData = transformData(this.props.data, horizontalAxis, [lineLabel])

    return (
      <LineChart
        data={plotData}
        height="300px"
        options={{
          title: 'Unique Visitors',
        }}
      />
    )
  }
}

UniqueVisitorChart.propTypes = {
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
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


export default connect(mapStateToProps, mapDispatchToProps)(UniqueVisitorChart)
