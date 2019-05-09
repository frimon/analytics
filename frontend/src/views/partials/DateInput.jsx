import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon } from 'semantic-ui-react'

class DateInput extends Component {
  constructor(props) {
    super(props)
    this.setDate = this.setDate.bind(this)
    this.state = {
      icon: <Icon name="calendar alternate outline" />,
    }
  }

  componentWillReceiveProps() {
    this.setState({
      icon: (<Icon name="check" color="green" />),
    })

    setTimeout(() => {
      this.setState({
        icon: (<Icon name="calendar alternate outline" />),
      })
    }, 2000)
  }

  setDate(event) {
    const { value } = event.target

    const selectedDate = new Date(value)

    if (
      selectedDate < new Date(this.props.minDate)
      || selectedDate > new Date(this.props.maxDate)
    ) {
      return
    }

    this.props.setDate(event.target.value)
  }

  render() {
    return (
      <Input type="date" label={this.props.label} fluid value={this.props.date} onChange={this.setDate} icon={this.state.icon} />
    )
  }
}

DateInput.propTypes = {
  date: PropTypes.string.isRequired,
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default DateInput
