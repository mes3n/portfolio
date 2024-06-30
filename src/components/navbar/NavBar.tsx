import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import { palette } from '../common/Palette'

import Logo from './Logo'

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
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  let [active, setActive] = useState<string>(location.pathname.replaceAll('/', ''))
  let [expand, setExpand] = useState<boolean>(false)

  useEffect(() => {
    setActive(location.pathname.replaceAll('/', ''))
  }, [location.pathname])

  useEffect(() => {
    const onClick = ({ target }: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(target as Node)) {
        setExpand(false)
      }
    }

    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('click', onClick)
    }
  })

  const links = [
    { link: '', name: 'Home' },
    { link: 'projects', name: 'Projects' },
    { link: 'about', name: 'About' },
    { link: 'contact', name: 'Contact' },
  ]

  return (
    <NavContainer ref={ref}>
      {isMobile
        ? <>
          <HamburgerMenu
            initial={{ transform: 'translate(150%, -70%)' }}
            animate={{ transform: expand ? 'translate(50%, -30%)' : 'translate(150%, -70%)' }}>
            {links.map(link => <NavLink onClick={() => {
              navigate(link.link)
            }} active={active === link.link}>{link.name}</NavLink>)}
          </HamburgerMenu>
          <Hamburger onClick={() => setExpand(!expand)} expand={expand} />
        </>
        : <>
          {links.map((link, i) => <NavLink onClick={() => {
            navigate(link.link)
            setActive(link.link)
          }} active={active === link.link} key={i}>{link.name}</NavLink>)}
        </>
      }
    </NavContainer>
  )
}

const Hamburger: React.FC<{ onClick: Function, expand: boolean }> = ({ onClick, expand }) => {

  const variants = {
    top: {
      opened: {
        backgroundColor: palette.light,
        transform: 'translate(0px, 8.5px)  rotate(-45deg)',
      },
      closed: {
        backgroundColor: palette.dark,
      }
    },
    middle: {
      opened: {
        backgroundColor: palette.light,
        transform: 'translate(0px, -1px)  rotate(-45deg)',
        opacity: 0,
      },
      closed: {
        backgroundColor: palette.dark,
      }
    },
    bottom: {
      opened: {
        backgroundColor: palette.light,
        transform: 'translate(0px, -8.5px) rotate(-135deg)',
      },
      closed: {
        backgroundColor: palette.dark,
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

  box-shadow: 0 0 8px 1px black;

  background: radial-gradient(circle, ${palette.gray}, ${palette.dark});
`

const NavLink = styled.div<{ active: boolean, hover?: boolean }>`
  color: ${props => props.active ? palette.light : palette.dark};
  
  height: min-content;
  margin-top: 4px;
  padding: 8px;
  padding-top: 4px;
  border-radius: 16px;

  font-size: 32px;
  cursor: pointer;

  transition: 100ms;
  &:hover {
    translate: -1px -1px;
  }

  @media screen and (min-width: 786px) {
    ${props => props.active
    ? css`
      background: linear-gradient(145deg, ${palette.gray}, ${palette.dark});
      text-shadow: 2px 2px black;
      translate: -1px -1px;
    `
    : css`
      text-shadow: 1px 1px ${palette.light};
      &:hover {
        translate: -1px -1px;
        text-shadow: 2px 2px ${palette.light};
      }
    `}
  }

  @media screen and (max-width: 786px) {
    background: ${props => props.active ? palette.blues[1] : 'none'};
    color: ${props => props.active ? palette.dark : palette.light};

    padding: 4px;
    padding-top: 0;

    font-size: 20px;
    border-radius: 4px;

    margin-top: 1vw;
  }
`


export default NavBar
