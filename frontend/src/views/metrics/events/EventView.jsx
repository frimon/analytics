import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Breadcrumb } from 'semantic-ui-react'
import { fetchData } from './actions'
import EventLineChart from './EventLineChart'

class EventView extends Component {
  constructor(props) {
    super(props)

    this.eventName = this.props.match.params.name
  }

  render() {
    return (
      <Container>
        <h1>Events</h1>

        <Breadcrumb>
          <Breadcrumb.Section>
            <NavLink to="/events">Events</NavLink>
          </Breadcrumb.Section>

          <Breadcrumb.Divider icon="right angle" />

          <Breadcrumb.Section active>
            {this.eventName}
          </Breadcrumb.Section>
        </Breadcrumb>

        <EventLineChart eventName={this.eventName} />
      </Container>
    )
  }
}


EventView.propTypes = {
  match: PropTypes.object.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global
  const eventState = applicationState.events

  return {
    events: eventState.toJS(),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventView))
