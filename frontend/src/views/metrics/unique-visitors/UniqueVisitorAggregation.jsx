import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Statistic, Popup } from 'semantic-ui-react'
import { fetchCount } from './actions'

class UniqueVisitorAggregation extends Component {
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
        content="A unique visitor is someone visiting the site from a certain device and may have several visits."
        trigger={<Statistic label="# Unique Visitors" value={this.props.count} inverted />}
      />
    )
  }
}

UniqueVisitorAggregation.propTypes = {
  count: PropTypes.number.isRequired,
  fetchCount: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global
  const uniqueVisitorState = applicationState.uniqueVisitors

  return {
    count: uniqueVisitorState.get('count'),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UniqueVisitorAggregation)
