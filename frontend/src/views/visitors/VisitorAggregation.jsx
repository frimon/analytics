import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import { sumRows } from '../helpers/apiDataHelpers'

const VisitorAggregation = (props) => {
  const sum = sumRows(props.data)

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
