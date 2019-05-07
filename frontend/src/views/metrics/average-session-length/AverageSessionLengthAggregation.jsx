import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic, Popup } from 'semantic-ui-react'
import { sumRows } from '../../helpers/apiDataHelpers'


const AverageSessionAggregation = (props) => {
  const sum = sumRows(props.data)

  const mean = (sum / props.data.length)

  return (
    <Popup
      content="A session is defined as a group of interactions one user takes within a given time frame on your website. This metric tells you how long a session is on an average."
      trigger={<Statistic label="Avg. session length (seconds)" value={`${mean.toPrecision(3)}`} inverted />}
    />
  )
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
