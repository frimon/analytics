import React from 'react'
import { Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Route, withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Index from '../views/overview/index'
import EventsDashboard from '../views/metrics/events/index'
import EventView from '../views/metrics/events/EventView'
import { NotFound, ApplicationError } from '../views/error'
import Menu from '../views/partials/Menu'

const App = (props) => {
  if (props.error) {
    return <ApplicationError error={props.error} />
  }

  return (
    <Container>
      <Menu />

      <Switch>
        <Route exact key="index" path="/" render={() => (<Index />)} />
        <Route key="viewEvent" path="/events/:name" component={EventView} />
        <Route exact key="events" path="/events" render={() => (<EventsDashboard />)} />
        <Route key="notFound" component={NotFound} />
      </Switch>
    </Container>
  )
}

App.defaultProps = {
  error: undefined,
}

App.propTypes = {
  error: PropTypes.object,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global

  return {
    error: globalState.get('error'),
  }
}

export default withRouter(connect(mapStateToProps)(App))
