import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../common/Logo'


const NavBar = () => {
  return (
    <Container>
      <Logo />
      <Nav />
    </Container>
  )
}

const Nav = () => {

  const navigate = useNavigate()
  let [active, setActive] = useState<string>(window.location.pathname.replaceAll('/', ''))

  const links = [
    {link: '', name: 'Home'},
    {link: 'about', name: 'About'},
    {link: 'contact', name: 'Contact'},
  ]

  return (
    <NavContainer>
      {links.map((link) => <NavLink onClick={() => {
        navigate(link.link)
        setActive(link.link)
      }} active={active === link.link}>{link.name}</NavLink>)}
    </NavContainer>
  )
}

const Container = styled.div`
  position: absolute;

  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 64px;

  z-index: 999;
`

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */

  gap: 32px;

  margin-right: 16px;
`

const NavLink = styled.div<{ active: boolean }>`

  background: ${(props) => props.active ? '#00b4d8' : ''};
  color: ${(props) => props.active ? '#222' : '#00b4d8'};
  
  padding: 8px;

  border-bottom-right-radius: 32px;

  font-size: 32px;
  cursor: pointer;
`


export default NavBar
