import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Container, Table, Menu, Icon,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData, fetchEventList } from './actions'

class EventsDashboard extends Component {
  constructor(props) {
    super(props)

    this.requestEventsData = this.requestEventsData.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchEventList()

    await this.requestEventsData()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.fromDate !== this.props.fromDate || prevProps.toDate !== this.props.toDate) {
      await this.requestEventsData()
    }
  }

  requestEventsData() {
    console.log(this.props.events)

    const eventsDataHttpRequest = Object
      .keys(this.props.events)
      .map(eventName => this.props.fetchData(this.props.fromDate, this.props.toDate, eventName))

    return Promise.all(eventsDataHttpRequest)
  }

  render() {
    const eventNames = Object.keys(this.props.events)
    const eventRows = eventNames.map(eventName => (
      <Table.Row>
        <Table.Cell><a>{eventName}</a></Table.Cell>
        <Table.Cell>{ this.props.events[eventName].reduce((sum, [date, currentValue]) => sum + currentValue, 0)}</Table.Cell>
      </Table.Row>
    ))

    return (
      <Container>
        <h1>Events</h1>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Event</Table.HeaderCell>
              <Table.HeaderCell>Count</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {eventRows}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    )
  }
}


EventsDashboard.propTypes = {
  events: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchEventList: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const eventState = applicationState.events
  const globalState = applicationState.global

  return {
    events: eventState.toJS(),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
    fetchEventList,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventsDashboard))
