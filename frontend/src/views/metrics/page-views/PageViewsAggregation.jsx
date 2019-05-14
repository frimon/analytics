import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Statistic, Popup } from 'semantic-ui-react'
import { fetchCount } from './actions'

class PageViewsAggregation extends Component {
  async componentDidMount() {
    await this.props.fetchCount(this.props.fromDate, this.props.toDate)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.fromDate !== this.props.fromDate || prevProps.toDate !== this.props.toDate) {
      await this.props.fetchCount(this.props.fromDate, this.props.toDate)
    }
  }

  render() {
    return (
      <Popup
        content="A page view occurrs when a page is loaded by someone. A session may consist of several page views."
        trigger={<Statistic label="# Page Views" value={this.props.count} inverted />}
      />
    )
  }
}

PageViewsAggregation.propTypes = {
  count: PropTypes.number.isRequired,
  fetchCount: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global
  const pageViewsState = applicationState.pageViews

  return {
    count: pageViewsState.get('count'),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PageViewsAggregation)
