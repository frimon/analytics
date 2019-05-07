import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Statistic, Popup } from 'semantic-ui-react'
import { sumRows } from '../../helpers/apiDataHelpers'

const BounceRateAggregation = (props) => {
  const sum = sumRows(props.data)

  const mean = (sum / props.data.length)

  return (
    <Popup
      content="Bounce rate is the percentage of visitors to a particular website who navigate away from the site after viewing only one page. A high bounce rate can occur if your users find your content non-satisfactory."
      trigger={<Statistic label="Bounce Rate" value={`${mean.toPrecision(3)}%`} inverted />}
    />
  )
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
