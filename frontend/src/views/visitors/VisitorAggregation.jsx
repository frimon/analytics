import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'

const VisitorAggregation = (props) => {
  const sum = props.data.reduce(
    (currentSum, row) => {
      const [_date, value] = row // eslint-disable-line no-unused-vars

      return currentSum + value
    },
    0,
  )

  return (<Statistic label="# Visitors" value={sum} inverted />)
}

VisitorAggregation.propTypes = {
  data: PropTypes.array.isRequired,
}

function mapStateToProps(applicationState) {
  const visitorState = applicationState.visitors

  return {
    data: visitorState.get('data').toJS(),
  }
}

export default connect(mapStateToProps)(VisitorAggregation)
