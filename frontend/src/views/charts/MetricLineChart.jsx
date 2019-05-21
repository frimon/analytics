import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LineChart from './LineChart'
import { transformData } from '../helpers/googleChartHelpers'

class MetricChart extends Component {
  async componentDidMount() {
    await this.props.fetchData(this.props.fromDate, this.props.toDate, this.props.unit)
  }

  async componentDidUpdate(previousProperties) {
    if (
      previousProperties.fromDate !== this.props.fromDate
      || previousProperties.toDate !== this.props.toDate
      || previousProperties.unit !== this.props.unit
    ) {
      await this.props.fetchData(this.props.fromDate, this.props.toDate, this.props.unit)
    }
  }

  render() {
    const axisType = this.props.unit === 'hour' ? 'datetime' : 'date'
    const horizontalAxis = { type: axisType, label: 'Day' }
    const plotData = transformData(this.props.data, horizontalAxis, [this.props.lineLabel])

    return (
      <LineChart
        data={plotData}
        height="300px"
        options={{
          title: this.props.chartTitle,
        }}
      />
    )
  }
}

MetricChart.propTypes = {
  data: PropTypes.array.isRequired,
  lineLabel: PropTypes.string.isRequired,
  chartTitle: PropTypes.string.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global

  return {
    unit: globalState.get('unit'),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

export default connect(mapStateToProps)(MetricChart)
