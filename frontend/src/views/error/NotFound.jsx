import React from 'react'
import { Icon } from 'semantic-ui-react'
import ApplicationError from './ApplicationError'

function NotFound() {
  return (
    <ApplicationError>
      <Icon name="warning circle" />
      Not found
    </ApplicationError>
  )
}

export default NotFound
