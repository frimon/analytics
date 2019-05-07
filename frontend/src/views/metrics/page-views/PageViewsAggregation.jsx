import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic, Popup } from 'semantic-ui-react'
import { sumRows } from '../../helpers/apiDataHelpers'

const PageViewsAggregation = (props) => {
  const sum = sumRows(props.data)

  return (
    <Popup
      content="A page view occurrs when a page is loaded by someone. A session may consist of several page views."
      trigger={<Statistic label="# Page Views" value={sum} inverted />}
    />
  )
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
