import React from 'react'
import { withRouter } from 'react-router'
import { Container, Grid } from 'semantic-ui-react'
import VisitorLineChart from '../metrics/visitors/VisitorLineChart'
import VisitorAggregation from '../metrics/visitors/VisitorAggregation'
import UniqueVisitorLineChart from '../metrics/unique-visitors/UniqueVisitorLineChart'
import UniqueVisitorAggregation from '../metrics/unique-visitors/UniqueVisitorAggregation'
import PageViewsLineChart from '../metrics/page-views/PageViewsLineChart'
import PageViewsAggregation from '../metrics/page-views/PageViewsAggregation'
import AverageSessionLengthLineChart from '../metrics/average-session-length/AverageSessionLengthLineChart'
import AverageSessionLengthAggregation from '../metrics/average-session-length/AverageSessionLengthAggregation'
import BounceRateLineChart from '../metrics/bounce-rate/BounceRateLineChart'
import BounceRateAggregation from '../metrics/bounce-rate/BounceRateAggregation'

const Overview = () => (
  <Container>
    <Grid padded columns="equal">
      <Grid.Row>
        <Grid.Column stretched tablet="8" computer="3" color="blue" textAlign="center">
          <VisitorAggregation />
        </Grid.Column>

        <Grid.Column stretched tablet="8" computer="3" color="blue" textAlign="center">
          <UniqueVisitorAggregation />
        </Grid.Column>

        <Grid.Column stretched tablet="8" computer="3" color="blue" textAlign="center">
          <PageViewsAggregation />
        </Grid.Column>

        <Grid.Column stretched tablet="8" computer="3" color="blue" textAlign="center">
          <AverageSessionLengthAggregation />
        </Grid.Column>

        <Grid.Column stretched color="blue" textAlign="center">
          <BounceRateAggregation />
        </Grid.Column>
      </Grid.Row>

      <Grid.Column tablet="16" computer="8">
        <VisitorLineChart />
      </Grid.Column>

      <Grid.Column tablet="16" computer="8">
        <UniqueVisitorLineChart />
      </Grid.Column>

      <Grid.Column tablet="16" computer="8">
        <PageViewsLineChart />
      </Grid.Column>

      <Grid.Column tablet="16" computer="8" textAlign="center" verticalAlign="middle">
        <AverageSessionLengthLineChart />
      </Grid.Column>

      <Grid.Column tablet="16" computer="8">
        <BounceRateLineChart />
      </Grid.Column>
    </Grid>
  </Container>
)

export default withRouter(Overview)
