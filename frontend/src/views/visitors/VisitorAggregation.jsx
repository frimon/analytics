import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { fetchCount } from './actions'

class VisitorAggregation extends Component {
  async componentDidMount() {
    await this.props.fetchCount(this.props.fromDate, this.props.toDate)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.fromDate !== this.props.fromDate || prevProps.toDate !== this.props.toDate) {
      await this.props.fetchCount(this.props.fromDate, this.props.toDate)
    }
  }

  render() {
    return (<Statistic label="# Visitors" value={this.props.count} inverted />)
  }
}

VisitorAggregation.propTypes = {
  count: PropTypes.number.isRequired,
  fetchCount: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global
  const visitorState = applicationState.visitors

  return {
    count: visitorState.get('count'),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitorAggregation)
