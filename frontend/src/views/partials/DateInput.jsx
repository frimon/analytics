import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

class DateInput extends Component {
  constructor(props) {
    super(props)
    this.setDate = this.setDate.bind(this)
  }

  setDate(event) {
    this.props.setDate(event.target.value)
  }

  render() {
    return (
      <Input type="date" label={this.props.label} fluid value={this.props.date} onChange={this.setDate} />
    )
  }
}

DateInput.propTypes = {
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default DateInput
