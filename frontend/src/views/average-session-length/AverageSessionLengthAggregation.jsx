import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'

const AverageSessionAggregation = (props) => {
  const [_header, ...dataPoints] = props.data // eslint-disable-line no-unused-vars

  const sum = dataPoints.reduce(
    (currentSum, row) => {
      const [_date, value] = row // eslint-disable-line no-unused-vars

      return currentSum + value
    },
    0,
  )

  const mean = (sum / dataPoints.length)

  return (<Statistic label="Avg. Session Length (seconds)" value={`${mean.toPrecision(3)}`} inverted />)
}

AverageSessionAggregation.propTypes = {
  data: PropTypes.array.isRequired,
}

function mapStateToProps(applicationState) {
  const averageSessionLengthState = applicationState.averageSessionLength

  return {
    data: averageSessionLengthState.get('data').toJS(),
  }
}

export default connect(mapStateToProps)(AverageSessionAggregation)
