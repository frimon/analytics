import React from 'react'
import { Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router'
import Index from '../views/overview/index'
import EventsDashboard from '../views/events/index'
import EventView from '../views/events/EventView'
import { NotFound } from '../views/error'
import Menu from '../views/partials/Menu'

function App() {
  return (
    <Container>
      <Menu />

      <Switch>
        <Route exact key="index" path="/" render={() => (<Index />)} />
        <Route exact key="events" path="/events" render={() => (<EventsDashboard />)} />
        <Route key="viewEvent" path="/events/:name" component={EventView} />
        <Route key="notFound" component={NotFound} />
      </Switch>
    </Container>
  )
}

export default App
