import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { motion } from 'framer-motion'
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

  const isMobile = useMediaQuery({
    query: '(max-width: 786px)'
  })

  const navigate = useNavigate()
  let [active, setActive] = useState<string>(window.location.pathname.replaceAll('/', ''))
  let [expand, setExpand] = useState<boolean>(false)

  useEffect(() => {
    active !== window.location.pathname.replaceAll('/', '') &&
      setActive(window.location.pathname.replaceAll('/', ''))
  })

  const links = [
    { link: '', name: 'Home' },
    { link: 'projects', name: 'Projects' },
    { link: 'about', name: 'About' },
    { link: 'contact', name: 'Contact' },
  ]

  return (
    <NavContainer>
      {isMobile
        ? <>
          <HamburgerMenu
            initial={{ transform: 'translate(150%, -70%)' }}
            animate={{ transform: expand ? 'translate(50%, -30%)' : 'translate(150%, -70%)' }}>
            {links.map((link) => <NavLink onClick={() => {
              navigate(link.link)
              setActive(link.link)
            }} active={active === link.link}>{link.name}</NavLink>)}
          </HamburgerMenu>
          <Hamburger onClick={() => setExpand(!expand)} expand={expand} />
        </>
        : <>
          {links.map((link) => <NavLink onClick={() => {
            navigate(link.link)
            setActive(link.link)
          }} active={active === link.link}>{link.name}</NavLink>)}
        </>
      }
    </NavContainer>
  )
}

const Hamburger: React.FC<{ onClick: Function, expand: boolean }> = ({ onClick, expand }) => {

  const variants = {
    top: {
      opened: {
        backgroundColor: '#eee',
        transform: 'translate(0px, 8.5px)  rotate(-45deg)',
      },
      closed: {
        backgroundColor: '#222',
      }
    },
    middle: {
      opened: {
        backgroundColor: '#eee',
        transform: 'translate(0px, -1px)  rotate(-45deg)',
        opacity: 0,
      },
      closed: {
        backgroundColor: '#222',
      }
    },
    bottom: {
      opened: {
        backgroundColor: '#eee',
        transform: 'translate(0px, -8.5px) rotate(-135deg)',
      },
      closed: {
        backgroundColor: '#222',
      }
    },
  }

  return (
    <HambugerBun onClick={() => onClick()}>
      <Slice variants={variants.top} animate={expand ? 'opened' : 'closed'} />
      <Slice variants={variants.middle} animate={expand ? 'opened' : 'closed'} />
      <Slice variants={variants.bottom} animate={expand ? 'opened' : 'closed'} />
    </HambugerBun>
  )
}

const Container = styled.div`
  position: fixed;

  display: flex;
  justify-content: space-between;

  width: 100%;
  z-index: 999;
`

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;

  flex-wrap: wrap;
  gap: 2vw;

  margin-right: 1vw;
  justify-content: right;

`

const HambugerBun = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 32px;
  height: 32px;

  margin: 4px;

  z-index: 2;
  cursor: pointer;
`

const Slice = styled(motion.div)`
    
  height: 3px;
  width: 28px;

  margin: 0 2px;

  border-radius: 1.5px;

  background: '#222';
`

const HamburgerMenu = styled(motion.div)`
  position: absolute;
  z-index: 1;

  width: 400px;
  aspect-ratio: 1;
  border-radius: 200px;

  display: flex;
  flex-direction: column;

  justify-content: end;

  box-sizing: border-box;
  padding: 64px;

  box-shadow: -1px 1px 8px black;

  background: radial-gradient(circle, #0077b6, #0077b6);
`

const NavLink = styled.div<{ active: boolean }>`

  background: ${(props) => props.active ? '#00b4d8' : ''};
  color: ${(props) => props.active ? '#222' : '#00b4d8'};
  
  height: min-content;
  padding: 8px;
  padding-top: 0;

  border-bottom-right-radius: 32px;

  font-size: 32px;
  cursor: pointer;

  @media screen and (max-width: 786px) {
    background: ${(props) => props.active ? '#caf0f8' : ''};
    color: ${(props) => props.active ? '#0077b6' : '#caf0f8'};


    padding: 4px;
    padding-top: 0;

    font-size: 20px;
    border-radius: 4px;

    margin-top: 1vw;

  }
`


export default NavBar
