import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import { Container, Margin, Title } from '../common/Common'

const About = () => {
  return (
    <Container>
      <Margin height={32} />
      <Title>About Me</Title>
      <Timeline />
    </Container>
  )
}

const Timeline = () => {

  let [scrollX, setScrollX] = useState<number>(0)
  let [prevScrollX, setPrevScrollX] = useState<number>(0)

  const isMobile = useMediaQuery({
    query: '(max-width: 786px)'
  })

  const clip = (min: number, num: number, max: number): number => {
    return Math.max(min, Math.min(num, max))
  }

  const events = [  // add some sort of expandable list...
    {
      title: 'Desktop',
      text: 'I build my very own, and first, desktop. To which, I promptly installed Linux.',
      date: Date.parse('2019-6-20'),
    },
    {
      title: 'Hello World',
      text: 'My very first computer program is written: print("Hello, World!)", in Python.',
      date: Date.parse('2019-12-17'),
    },
    {
      title: 'Programming',
      text: 'I develop my first game, Snake, in Python. Although heavily dependent on an online tutorial.',
      date: Date.parse('2020-4-5'),
    },
    {
      title: 'C/C++',
      text: 'In order to expand my knowledge, I start developing with C/C++. My first project if a tic-tac-toe game.',
      date: Date.parse('2021-5-16'),
    },
    {
      title: 'Calculator',
      text: 'I decide to jailbreak my graphing calculator and program, in C, and install Space Invaders to it.',
      date: Date.parse('2021-9-10'),
    },
    {
      title: '3d',
      text: '3d has seemed impossible following my 2d programming, so I decide to try and program a voxel-based game with OpenGL in C++.',
      date: Date.parse('2022-7-15'),
    },
    {
      title: 'Submarine',
      text: 'Together with a friend, I start planning, designing and developing software for a homemade RC submarine.',
      date: Date.parse('2022-5-20'),
    },
    {
      title: 'front-end',
      text: 'I decide to start learning about front-end development and try to build a prototype personal website.',
      date: Date.parse('2022-12-13'),
    },
    

    {
      title: 'Today',
      text: 'I keep looking for ways to develop myself within programming and learn more about it!',
      date: Date.now(),
    },
  ]

  events.sort((a, b) => a.date > b.date ? 1 : -1)

  const zero = events[0].date
  const max = Date.now()
  const maxWidth = !isMobile ? 200 : 400  // in percent
  const delta = (max - zero) / maxWidth

  useEffect(() => {
    const handleMouseScroll = (event: WheelEvent) => {
      setScrollX(clip(0, scrollX + event.deltaX * 0.2, maxWidth))
    }

    const handleTouchMove = (event: TouchEvent) => {
      setScrollX(clip(0, scrollX + (prevScrollX - event.touches[0].screenX) * 0.8, maxWidth))
      setPrevScrollX(event.touches[0].screenX)
    }

    const handleTouchStart = (event: TouchEvent) => {
      setPrevScrollX(event.touches[0].screenX)
    }

    window.addEventListener('wheel', handleMouseScroll)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchstart', handleTouchStart)

    return () => {
      window.removeEventListener('wheel', handleMouseScroll)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  })

  return (
    <TlWrapper>
      <TlLine>
        <LineEndArrow active={scrollX > 0} leftSide={true} callback={() => setScrollX(0)} />
        {events.map((e, i) => {
          const x = (e.date - zero) / delta - scrollX
          return <AnimatePresence><Card rise={i % 2 === 0 ? 'true' : 'false'} initial={{ left: 0 }} animate={{  // TODO: add slower initial animation
            scale: clip(0.0, Math.min(x, 100 - x) * 0.4 + 1, 1.0),
            opacity: clip(0.0, Math.min(x, 100 - x) * 0.4 + 1, 1.0),
            left: isMobile ? `calc(${x}% - 0px)` : `calc(${x}% - 0px)`,
          }}>

            <CardTitle>{e.title}</CardTitle>
            <CardDate>{new Date(e.date).toLocaleDateString('sv-SE')}</CardDate>
            <Margin height={16} />
            <CardDescription>{e.text}</CardDescription>

            <CardPoint rise={i % 2 === 0 ? 'true' : 'false'} />
          </Card></AnimatePresence>
        })}
        <LineEndArrow active={scrollX < maxWidth} leftSide={false} callback={() => setScrollX(maxWidth)} />
      </TlLine>
    </TlWrapper>
  )
}

const TlWrapper = styled.div`
  display: grid;
  place-items: center;

  width: 100%;
  margin: auto 0;

  overflow: visible;
`

const TlLine = styled.div`
  position: relative;

  height: 8px;
  width: 92%;

  border-radius: 4px;

  background: #222;

  @media screen and (max-width: 786px) {
    width: 92%;
  }
`

const Card = styled(motion.div) <{ rise: string }>`
  position: absolute;
  
  left: 0;
  
  height: 36vh;
  width: 20%;

  background: #0077b6;
  color: #caf0f8;

  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;

  ${props => props.rise === 'true'
    ? css`
      bottom: 20px;
      border-bottom-left-radius: 0;
    `
    : css`
      top: 20px;
      border-top-left-radius: 0;
    `
  };


  @media screen and (max-width: 786px) {
    height: 30vh;
    width: 50%;
  }
`

const CardPoint = styled.div<{ rise: string }>`
  position: absolute;

  left: 0;
  z-index: -1;

  width: 22px;
  height: 22px;

  background: #0077b6;

  ${props => props.rise === 'true'
    ? css`
      top: calc(100% - 11px);
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      `
    : css`
      bottom: calc(100% - 11px);
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
    `
  };
  
`

const CardTitle = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 36px;

  @media screen and (max-width: 786px) {
    font-size: 20px;
  }
`

const CardDate = styled.p`
  font-family: 'Ubuntu', sans-serif;
  font-size: 14px;

  @media screen and (max-width: 786px) {
    font-size: 10px;
  }
`

const CardDescription = styled.p`
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;

  @media screen and (max-width: 786px) {
    font-size: 14px;
    /* font-weight: 300; */
  }
`

const LineEndArrow: React.FC<{ active: boolean, leftSide: boolean, callback: Function }> = ({ active, leftSide, callback }) => {

  const variants = {
    top: {
      active: {
        transform: leftSide ? 'rotate(-45deg)' : 'rotate(-135deg)'
      },
      inactive: {
        transform: 'rotate(-90deg)'
      },
    },
    bottom: {
      active: {
        transform: leftSide ? 'rotate(45deg)' : 'rotate(135deg)'
      },
      inactive: {
        transform: 'rotate(90deg)'

      },
    },
  }

  return (
    <HamburgerBun leftSide={leftSide} onClick={() => callback()}>
      <Slice variants={variants.top} animate={active ? 'active' : 'inactive'} />
      <Slice variants={variants.bottom} animate={active ? 'active' : 'inactive'} />
    </HamburgerBun>
  )
}

const HamburgerBun = styled.div<{ leftSide: boolean }>`
  position: absolute;

  top: -8px;

  ${props => props.leftSide ? css`
    left: -10px;
  ` : css`
    right: -14px;
  `}

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 24px;
  height: 24px;

  cursor: pointer;
`

const Slice = styled(motion.div)`
    
  height: 8px;
  width: 20px;

  border-radius: 4px;

  background: #222;
`


export default About
