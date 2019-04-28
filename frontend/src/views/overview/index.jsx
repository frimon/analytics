import React from 'react'
import { withRouter } from 'react-router'
import { Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import VisitorLineChart from '../visitors/VisitorLineChart'
import VisitorAggregation from '../visitors/VisitorAggregation'
import UniqueVisitorLineChart from '../unique-visitors/UniqueVisitorLineChart'
import UniqueVisitorAggregation from '../unique-visitors/UniqueVisitorAggregation'


const Overview = () => (
  <Container>
    <Grid padded>
      <Grid.Row columns={4} verticalAlign="middle" stretched>
        <Grid.Column color="blue" textAlign="center">
          <VisitorAggregation />
        </Grid.Column>

        <Grid.Column color="blue" textAlign="center" stretched>
          <UniqueVisitorAggregation />
        </Grid.Column>

        <Grid.Column color="blue" textAlign="center">
          <h1>To be added</h1>
        </Grid.Column>

        <Grid.Column color="blue" textAlign="center">
          <h1>To be added</h1>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width="8">
          <VisitorLineChart />
        </Grid.Column>

        <Grid.Column width="8">
          <UniqueVisitorLineChart />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
)

function mapStateToProps(applicationState) {
  const visitorState = applicationState.visitors

  return {
    data: visitorState.get('data').toJS(),
  }
}

export default connect(mapStateToProps)(withRouter(Overview))
