import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'

const PageViewsAggregation = (props) => {
  const sum = props.data.reduce(
    (currentSum, row) => {
      const [_date, value] = row // eslint-disable-line no-unused-vars

      return currentSum + value
    },
    0,
  )

  return (<Statistic label="# Page Views" value={sum} inverted />)
}

PageViewsAggregation.propTypes = {
  data: PropTypes.array.isRequired,
}

function mapStateToProps(applicationState) {
  const pageViewState = applicationState.pageViews

  return {
    data: pageViewState.get('data').toJS(),
  }
}

export default connect(mapStateToProps)(PageViewsAggregation)
