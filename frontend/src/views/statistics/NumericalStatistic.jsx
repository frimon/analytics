import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic, Popup } from 'semantic-ui-react'

class NumericalStatistic extends Component {
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
        content={this.props.info}
        trigger={<Statistic label={this.props.label} value={this.props.value} inverted />}
      />
    )
  }
}

NumericalStatistic.propTypes = {
  // From Parent
  info: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  fetchCount: PropTypes.func.isRequired,

  // From Redux
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global

  return {
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

export default connect(mapStateToProps)(NumericalStatistic)
