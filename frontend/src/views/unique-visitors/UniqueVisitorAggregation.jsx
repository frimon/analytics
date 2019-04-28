import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'

const UniqueVisitorAggregation = (props) => {
  const sum = props.data.reduce(
    (currentSum, row) => {
      const [_date, value] = row // eslint-disable-line no-unused-vars

      return currentSum + value
    },
    0,
  )

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
