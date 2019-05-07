import React, { Component } from 'react'
import {
  Modal, Header, Button, Icon, Divider, Message, Menu,
} from 'semantic-ui-react'
import Cookies from 'universal-cookie'

class Introduction extends Component {
  constructor(props) {
    super(props)

    this.cookies = new Cookies()

    const isNewUser = this.cookies.get('newUser') || true

    this.state = {
      open: JSON.parse(isNewUser),
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    if (this.cookies.get('newUser') === undefined) {
      const yearInSeconds = 60 * 60 * 24 * 365

      this.cookies.set('newUser', 'false', { maxAge: yearInSeconds })
    }

    const { open } = this.state

    this.setState({
      open: !open,
    })
  }

  render() {
    return (
      <Modal open={this.state.open} trigger={<Menu.Item onClick={this.toggle}><Icon name="help" /></Menu.Item>}>
        <Modal.Header>Welcome to Analytics</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>
              <Icon name="code" />
              Step 1: Add tracking snippet
            </Header>
            <p>
              The first part of setting up the analytics tool,
              is to add the following JavaScript snippet to your HTML.
              This will enable tracking of your users.
              This snippet must be included in all of the pages that you wish to track.

            </p>
            <Message>
              <p>
                {'<script type="text/javascript" src="http://localhost:3002/dist/webanalytics.js"></script>'}
                <br />
                {'<script type="text/javascript">'}
                {'webanalytics(\'http://localhost:3001\')'}
                {'</script>'}
              </p>
            </Message>

            <Divider />

            <Header>
              <Icon name="users" />
              Step 2: Inform users
            </Header>
            <p>
              It is, by law, required of you to inform your users that
              you are tracking some information about them.
              Be a good person and tell them about this.

            </p>
            <Divider />

            <Header>
              <Icon name="chart line" />
              Step 3: Start analyzing
            </Header>
            <p>
              Your data will start being collected by the analytics tool from now.
              This means that you are ready to start analyzing. Press the question marks
              {' '}
              (
              <Icon name="question" />
              )
              {' '}
              if you want more information about a specific functionality.
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.toggle}>
            Proceed
            {' '}
            <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Introduction
