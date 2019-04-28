import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'

const VisitorAggregation = (props) => {
  const sum = props.data.reduce(
    (currentSum, [_, amount]) => currentSum + amount, // eslint-disable-line no-unused-vars
    0,
  )

  return (<Statistic label="Total visitors" value={sum} inverted />)
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
