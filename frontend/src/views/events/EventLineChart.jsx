import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LineChart from '../charts/LineChart'
import { fetchData } from './actions'

const EventLineChart = (props) => {
  function tranformData(data) {
    const transformRow = ([date, value]) => [new Date(date), value]
    const dataHeader = [
      { type: 'date', label: 'Day' }, 'Events',
    ]

    return [dataHeader, ...data.map(transformRow)]
  }

  if (!props.events[props.eventName]) {
    return (<h1>Loading</h1>)
  }

  return (
    <LineChart
      chartType="LineChart"
      chartName=""
      height="300px"
      data={tranformData(props.events[props.eventName])}
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
