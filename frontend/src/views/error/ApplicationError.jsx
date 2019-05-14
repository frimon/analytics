import React from 'react'
import PropTypes from 'prop-types'
import {
  Container, Message, Icon, Button,
} from 'semantic-ui-react'

const ApplicationError = props => (
  <Container>
    <Message size="huge" negative icon>
      <Icon name="exclamation triangle" />
      <Message.Content>
        <Message.Header>{props.error.errorTitle}</Message.Header>

        <p>{props.error.errorMessage}</p>
      </Message.Content>
    </Message>

    <a href="/">
      <Button content="Reload application" primary />
    </a>

  </Container>
)

ApplicationError.propTypes = {
  error: PropTypes.any.isRequired,
}

export default ApplicationError
