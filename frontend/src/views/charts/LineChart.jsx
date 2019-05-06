import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from './Chart'

class LineChart extends Component {
  async componentDidMount() {
    await this.props.fetchData(this.props.fromDate, this.props.toDate)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.fromDate !== this.props.fromDate || prevProps.toDate !== this.props.toDate) {
      await this.props.fetchData(this.props.fromDate, this.props.toDate)
    }
  }

  render() {
    return (
      <Chart
        height={this.props.height}
        chartType="LineChart"
        options={this.props.options}
        data={this.props.data}
      />
    )
  }
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
}

export default LineChart
