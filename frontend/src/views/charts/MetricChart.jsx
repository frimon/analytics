import { Component } from 'react'
import PropTypes from 'prop-types'

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
}

MetricChart.propTypes = {
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
}

export default MetricChart
