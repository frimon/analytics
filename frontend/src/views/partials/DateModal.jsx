import React from 'react'
import {
  Menu, Modal, Grid, Divider, Icon, Dropdown,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import DateInput from './DateInput'
import { setFromDate, setToDate } from '../actions'

const DateModal = (props) => {
  const setLastDayInterval = () => {
    const fromDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    const toDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')

    props.setFromDate(fromDate)
    props.setToDate(toDate)
  }

  const setLastWeekInterval = () => {
    const fromDate = moment().subtract(1, 'week').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    const toDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')

    props.setFromDate(fromDate)
    props.setToDate(toDate)
  }

  const setLastMonthInterval = () => {
    const fromDate = moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    const toDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')

    props.setFromDate(fromDate)
    props.setToDate(toDate)
  }

  const fromDateFormatted = moment(props.fromDate).format('YYYY-MM-DD')
  const toDateFormatted = moment(props.toDate).format('YYYY-MM-DD')

  const modalTrigger = (
    <Menu.Item link position="right">
      {`${fromDateFormatted} to ${toDateFormatted}`}
      <Icon name="calendar alternate outline" />
    </Menu.Item>
  )


  return (
    <Modal trigger={modalTrigger}>
      <Modal.Header>Change date interval</Modal.Header>

      <Modal.Content>
        <Modal.Description>
          <p>You can easily change the interval of the data below.</p>
        </Modal.Description>

        <Divider />

        <Grid centered>
          <Grid.Column width={6}>
            <DateInput
              label="From"
              date={fromDateFormatted}
              minDate={(new Date(0, 0, 0)).toString()}
              maxDate={props.toDate}
              setDate={props.setFromDate}
            />
          </Grid.Column>

          <Grid.Column width={6}>
            <DateInput
              label="To"
              minDate={props.fromDate}
              maxDate={(new Date(2999, 11, 11)).toString()}
              date={toDateFormatted}
              setDate={props.setToDate}
            />
          </Grid.Column>

          <Grid.Column width={12} textAlign="center">
            <Dropdown text="Select a pre-defined interval">
              <Dropdown.Menu>
                <Dropdown.Item onClick={setLastDayInterval} text="Last day" />
                <Dropdown.Item onClick={setLastWeekInterval} text="Last week" />
                <Dropdown.Item onClick={setLastMonthInterval} text="Last month" />
              </Dropdown.Menu>
            </Dropdown>

          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

DateModal.propTypes = {
  fromDate: PropTypes.string.isRequired,
  setFromDate: PropTypes.func.isRequired,
  toDate: PropTypes.string.isRequired,
  setToDate: PropTypes.func.isRequired,
}

function mapStateToProps(applicationState) {
  const globalState = applicationState.global

  return {
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setFromDate,
    setToDate,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DateModal)
