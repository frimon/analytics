import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import {
  Menu, Modal, Grid, Divider, Icon,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DateInterval from './DateInput'
import { setFromDate, setToDate } from '../actions'


const MenuComponent = (props) => {
  const modalTrigger = (
    <Menu.Item link position="right">
      {`${props.fromDate} to ${props.toDate}`}
      <Icon name="calendar alternate outline" />
    </Menu.Item>
  )

  return (
    <Menu>
      <Menu.Item link active={props.location.pathname === '/'}>Overview</Menu.Item>
      <Menu.Item link>Events</Menu.Item>

      <Modal trigger={modalTrigger}>
        <Modal.Header>Change date interval</Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <p>You can easily change the interval of the data below.</p>
          </Modal.Description>

          <Divider />

          <Grid centered>
            <Grid.Column width={6}>
              <DateInterval
                label="From"
                date={props.fromDate}
                setDate={props.setFromDate}
              />
            </Grid.Column>

            <Grid.Column width={6}>
              <DateInterval
                label="To"
                date={props.toDate}
                setDate={props.setToDate}
              />
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </Menu>
  )
}

MenuComponent.propTypes = {
  fromDate: PropTypes.string.isRequired,
  setFromDate: PropTypes.func.isRequired,
  toDate: PropTypes.string.isRequired,
  setToDate: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuComponent))
