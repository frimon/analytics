import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchData } from './actions'
import { transformData } from '../../helpers/googleChartHelpers'
import LineChart from '../../charts/LineChart'

class EventLineChart extends Component {
  async componentDidMount() {
    await this.props.fetchData(
      this.props.fromDate,
      this.props.toDate,
      this.props.unit,
      this.props.eventName,
    )
  }

  async componentDidUpdate(previousProperties) {
    if (
      previousProperties.fromDate !== this.props.fromDate
      || previousProperties.toDate !== this.props.toDate
      || previousProperties.unit !== this.props.unit
    ) {
      await this.props.fetchData(
        this.props.fromDate,
        this.props.toDate,
        this.props.unit,
        this.props.eventName,
      )
    }
  }

  render() {
    if (!this.props.events[this.props.eventName]) {
      return (<h1>Loading</h1>)
    }

    const axisType = this.props.unit === 'hour' ? 'datetime' : 'date'
    const horizontalAxis = { type: axisType, label: 'Day' }
    const lineLabel = 'Events'
    const plotData = transformData(
      this.props.events[this.props.eventName],
      horizontalAxis,
      [lineLabel],
    )

    return (
      <LineChart
        data={plotData}
        height="300px"
        options={{
          title: this.props.eventName,
        }}
      />
    )
  }
}

EventLineChart.propTypes = {
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  events: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const eventsState = applicationState.events
  const globalState = applicationState.global

  return {
    events: eventsState.toJS(),
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


export default connect(mapStateToProps, mapDispatchToProps)(EventLineChart)
