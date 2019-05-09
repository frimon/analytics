import React from 'react'
import PropTypes from 'prop-types'
import { Chart } from 'react-google-charts'
import { Grid } from 'semantic-ui-react'

const ChartComponent = props => (
  <Grid.Row>
    <Grid.Column>
      <Chart
        height={props.height}
        chartType={props.chartType}
        loader={<div>Loading Chart</div>}
        data={props.data}
        options={props.options}
        rootProps={{ 'data-testid': '1' }}
      />
    </Grid.Column>
  </Grid.Row>
)

ChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  chartType: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
}

export default ChartComponent
