import React from 'react'
import PropTypes from 'prop-types'
import { Chart } from 'react-google-charts'
import {
  Grid, Dimmer, Loader, Segment,
} from 'semantic-ui-react'

const hasDataPoints = (data = []) => data.length > 1

const ChartComponent = (props) => {
  const loader = (
    <Segment placeholder>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Segment>
  )

  if (!hasDataPoints(props.data)) {
    return loader
  }

  return (
    <Grid.Row>
      <Grid.Column>
        <Chart
          height={props.height}
          chartType={props.chartType}
          data={props.data}
          loader={loader}
          options={props.options}
          rootProps={{ 'data-testid': '1' }}
        />
      </Grid.Column>
    </Grid.Row>
  )
}

ChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  chartType: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
}

export default ChartComponent
