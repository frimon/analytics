import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import { sumRows } from '../../helpers/apiDataHelpers'

const PageViewsAggregation = (props) => {
  const sum = sumRows(props.data)

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
