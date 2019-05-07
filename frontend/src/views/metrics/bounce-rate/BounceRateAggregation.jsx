import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import { sumRows } from '../helpers/apiDataHelpers'

const BounceRateAggregation = (props) => {
  const sum = sumRows(props.data)

  const mean = (sum / props.data.length)

  return (<Statistic label="Bounce Rate" value={`${mean.toPrecision(3)}%`} inverted />)
}

BounceRateAggregation.propTypes = {
  data: PropTypes.array.isRequired,
}

function mapStateToProps(applicationState) {
  const bounceRateState = applicationState.bounceRate

  return {
    data: bounceRateState.get('data').toJS(),
  }
}

export default connect(mapStateToProps)(BounceRateAggregation)
