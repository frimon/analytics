import React from 'react'
import { Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router'
import Index from '../views/index'
import { NotFound } from '../views/error'

function App() {
  return (
    <Container>
      <Switch>
        <Route key="index" path="/" render={() => (<Index />)} />
        <Route key="notFound" component={NotFound} />
      </Switch>
    </Container>
  )
}

export default App
