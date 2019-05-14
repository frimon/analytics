import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Statistic, Popup } from 'semantic-ui-react'
import { fetchCount } from './actions'

class AverageSessionAggregation extends Component {
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
        content="A session is defined as a group of interactions one user takes within a given time frame on your website. This metric tells you how long a session is on an average."
        trigger={<Statistic label="Avg. session length (seconds)" value={`${this.props.count.toPrecision(3)}`} inverted />}
      />
    )
  }
}

AverageSessionAggregation.propTypes = {
  count: PropTypes.number.isRequired,
  fetchCount: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global
  const averageSessionLengthState = applicationState.averageSessionLength

  return {
    count: averageSessionLengthState.get('count'),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AverageSessionAggregation)
