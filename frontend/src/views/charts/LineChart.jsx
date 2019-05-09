import React from 'react'
import PropTypes from 'prop-types'
import { Placeholder } from 'semantic-ui-react'
import Chart from './Chart'

const ChartComponent = (props) => {
  if (props.data.length === 0) {
    return (
      <Placeholder fluid>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    )
  }

  return (
    <Chart
      chartType="LineChart"
      data={props.data}
      height={props.height}
      options={props.options}
    />
  )
}

ChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
}

export default ChartComponent
