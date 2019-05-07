import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LineChart from '../../charts/LineChart'
import { fetchData } from './actions'
import { transformData } from '../../helpers/googleChartHelpers'

const EventLineChart = (props) => {
  if (!props.events[props.eventName]) {
    return (<h1>Loading</h1>)
  }

  const horizontalAxis = { type: 'date', label: 'Day' }
  const lineLabel = 'Events'
  const plotData = transformData(props.events[props.eventName], horizontalAxis, [lineLabel])

  return (
    <LineChart
      chartType="LineChart"
      chartName=""
      height="300px"
      data={plotData}
      fetchData={props.fetchData}
      fromDate={props.fromDate}
      toDate={props.toDate}
      options={{
        title: props.eventName,
      }}
    />
  )
}

EventLineChart.propTypes = {
  events: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const eventsState = applicationState.events
  const globalState = applicationState.global

  return {
    events: eventsState.toJS(),
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
