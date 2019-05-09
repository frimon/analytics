import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUnit } from '../actions'

const DataUnit = (props) => {
  const updateUnitToHour = () => props.setUnit('hour')
  const updateUnitToDay = () => props.setUnit('day')
  const unitCapitalized = props.unit[0].toUpperCase() + props.unit.slice(1)

  return (
    <Dropdown item text={`Unit: ${unitCapitalized}`}>
      <Dropdown.Menu>
        <Dropdown.Header>Select Unit For Datapoints</Dropdown.Header>
        <Dropdown.Item onClick={updateUnitToHour}>Hour</Dropdown.Item>
        <Dropdown.Item onClick={updateUnitToDay}>Day</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

DataUnit.propTypes = {
  unit: PropTypes.string.isRequired,
  setUnit: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global

  return {
    unit: globalState.get('unit'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUnit,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DataUnit)
