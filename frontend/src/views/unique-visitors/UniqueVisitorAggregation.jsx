import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import { sumRows } from '../helpers/apiDataHelpers'

const UniqueVisitorAggregation = (props) => {
  const sum = sumRows(props.data)

  return (<Statistic label="# Unique Visitors" value={sum} inverted />)
}

UniqueVisitorAggregation.propTypes = {
  data: PropTypes.array.isRequired,
}

function mapStateToProps(applicationState) {
  const uniqueVisitorState = applicationState.uniqueVisitors

  return {
    data: uniqueVisitorState.get('data').toJS(),
  }
}

export default connect(mapStateToProps)(UniqueVisitorAggregation)
