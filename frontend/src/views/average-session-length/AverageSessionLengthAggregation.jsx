import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import { sumRows } from '../helpers/apiDataHelpers'

const AverageSessionAggregation = (props) => {
  const sum = sumRows(props.data)

  const mean = (sum / props.data.length)

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
