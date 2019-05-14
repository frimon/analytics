import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Statistic, Popup } from 'semantic-ui-react'
import { fetchCount } from './actions'

class BounceRateAggregation extends Component {
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
        content="Bounce rate is the percentage of visitors to a particular website who navigate away from the site after viewing only one page. A high bounce rate can occur if your users find your content non-satisfactory."
        trigger={<Statistic label="Bounce Rate" value={`${this.props.count.toPrecision(2)}%`} inverted />}
      />
    )
  }
}

BounceRateAggregation.propTypes = {
  count: PropTypes.number.isRequired,
  fetchCount: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global
  const bounceRateState = applicationState.bounceRate

  return {
    count: bounceRateState.get('count'),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BounceRateAggregation)
