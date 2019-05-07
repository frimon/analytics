import React from 'react'
import {
  Menu, Modal, Grid, Divider, Icon,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DateInput from './DateInput'
import { setFromDate, setToDate } from '../actions'

const DateModal = (props) => {
  const modalTrigger = (
    <Menu.Item link position="right">
      {`${props.fromDate} to ${props.toDate}`}
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
              date={props.fromDate}
              setDate={props.setFromDate}
            />
          </Grid.Column>

          <Grid.Column width={6}>
            <DateInput
              label="To"
              date={props.toDate}
              setDate={props.setToDate}
            />
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
