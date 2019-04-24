import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import VisitorChart from '../charts/visitors/index'

class Index extends Component {
  render() {
    return (
      <Container>
        <VisitorChart />
      </Container>
    )
  }
}

Index.propTypes = {
}

Index.defaultProps = {
}

export default Index
