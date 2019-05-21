import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import DateModal from './DateModal'
import Introduction from '../introduction/Introduction'
import DataUnit from './DataUnit'

const MenuComponent = () => (
  <Menu>
    <Menu.Item as={NavLink} to="/" exact>Dashboard</Menu.Item>
    <Menu.Item as={NavLink} to="/events" exact>Events</Menu.Item>

    <Menu.Menu position="right">
      <DataUnit />
      <DateModal />
      <Introduction />
    </Menu.Menu>

  </Menu>
)

export default MenuComponent
