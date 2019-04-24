import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Chart } from 'react-google-charts'
import {
  Grid, Divider, Input, Header,
} from 'semantic-ui-react'
import moment from 'moment'
import { fetchData } from './actions'

class Index extends Component {
  constructor(props) {
    super(props)

    const today = moment()

    this.state = {
      fromDate: today.format('YYYY-MM-DD'),
      toDate: today.add(30, 'days').format('YYYY-MM-DD'),
    }

    this.updateFromDate = this.updateFromDate.bind(this)
    this.updateToDate = this.updateToDate.bind(this)
    this.updateData = this.updateData.bind(this)
  }

  componentDidMount() {
    this.props.fetchData(this.state.fromDate, this.state.toDate)
  }

  async updateFromDate(event) {
    await this.setState({
      fromDate: event.target.value,
    })

    this.updateData()
  }

  async updateToDate(event) {
    await this.setState({
      toDate: event.target.value,
    })

    this.updateData()
  }

  async updateData() {
    if (!this.state.fromDate || !this.state.toDate) {
      return
    }

    if (moment(this.state.fromDate) > moment(this.state.toDate)) {
      this.setState(previousState => ({
        fromDate: previousState.toDate,
      }))
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1">Visitors</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Input type="date" label="From" fluid value={this.state.fromDate} onChange={this.updateFromDate} />
          </Grid.Column>

          <Grid.Column width={8}>
            <Input type="date" label="To" fluid value={this.state.toDate} onChange={this.updateToDate} />
          </Grid.Column>
        </Grid.Row>

        <Divider />

        <Grid.Row>
          <Grid.Column>
            <Chart
              height="500px"
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.props.data}
              options={{
                hAxis: {
                  title: 'Date',
                },
                vAxis: {
                  title: 'Days',
                },
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

Index.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const state = applicationState.visitors

  return {
    data: state.get('data').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
