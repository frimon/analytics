import React from 'react'
import PropTypes from 'prop-types'
import Chart from './Chart'

const ChartComponent = props => (
  <Chart
    chartType="LineChart"
    data={props.data}
    height={props.height}
    options={props.options}
  />
)

ChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
}

export default ChartComponent
