import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'

const BounceRateAggregation = (props) => {
  const [_header, ...dataPoints] = props.data // eslint-disable-line no-unused-vars

  const sum = dataPoints.reduce(
    (currentSum, row) => {
      const [_date, value] = row // eslint-disable-line no-unused-vars

      return currentSum + value
    },
    0,
  )

  const mean = (sum / dataPoints.length)

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
