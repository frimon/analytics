import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

function ApplicationError({ children }) {
  return (
    <div className="application-error">
      <Header>{children}</Header>
    </div>
  )
}

ApplicationError.propTypes = {
  children: PropTypes.any.isRequired,
}

export default ApplicationError
