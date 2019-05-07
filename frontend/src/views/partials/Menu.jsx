import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import DateModal from './DateModal'

const MenuComponent = () => (
  <Menu>
    <Menu.Item as={NavLink} to="/" exact>Dashboard</Menu.Item>
    <Menu.Item as={NavLink} to="/events" exact>Events</Menu.Item>

    <DateModal />
  </Menu>
)

export default MenuComponent
