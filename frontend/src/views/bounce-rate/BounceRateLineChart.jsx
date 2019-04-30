import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LineChart from '../charts/LineChart'
import { fetchData } from './actions'

const BounceRateLineChart = (props) => {
  function tranformData(data) {
    const transformRow = ([date, value]) => [new Date(date), value]
    const dataHeader = [
      { type: 'date', label: 'Day' }, 'Bounce Rate',
    ]

    return [dataHeader, ...data.map(transformRow)]
  }

  return (
    <LineChart
      chartType="LineChart"
      chartName=""
      height="300px"
      data={tranformData(props.data)}
      fetchData={props.fetchData}
      fromDate={props.fromDate}
      toDate={props.toDate}
      options={{
        title: 'Bounce Rate %',
      }}
    />
  )
}

BounceRateLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const bounceRateState = applicationState.bounceRate
  const globalState = applicationState.global

  return {
    data: bounceRateState.get('data').toJS(),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BounceRateLineChart)
