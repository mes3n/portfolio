import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

  const isMobile = useMediaQuery({
    query: '(max-width: 786px)'
  })

  const zero = Date.parse('2004-06-14')
  const max = Date.now()
  const maxWidth = !isMobile ? 150 : 300  // in percent
  const delta = (max - zero) / maxWidth

  const clip = (min: number, num: number, max: number): number => {
    return Math.max(min, Math.min(num, max))
  }

  const events = [
    {
      title: 'First',
      text: 'I am, hence i thought;',
      time: Date.parse('2004-06-14'),
    },
    {
      title: 'Last',
      text: 'I am, hence i thought;',
      time: Date.parse('2023-06-14'),
    },
    {
      title: 'Hello World',
      text: 'I am, hence i thought;',
      time: Date.parse('2008-06-14'),
    },
    {
      title: 'Hello World',
      text: 'I am, hence i thought;',
      time: 1313401600000,
    },
    {
      title: 'Hello World',
      text: 'I am, hence i thought;',
      time: 1113401600000,
    },
  ]

  events.sort((a, b) => a.time > b.time ? 1 : -1)

  useEffect(() => {
    const handleMouseScroll = (event: WheelEvent) => {
      setScrollX(clip(0, scrollX + event.deltaX * 0.2, maxWidth))
    }

    const handleTouchMove = (event: TouchEvent) => {
      setScrollX(clip(0, event.touches[0].clientX, maxWidth - 100))
    }

    window.addEventListener('wheel', handleMouseScroll)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('wheel', handleMouseScroll)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  })

  return (
    <TlWrapper>
      <TlLine>
        <LineEndArrow active={scrollX > 0} leftSide={true} callback={() => setScrollX(0)} />
        {events.map((e, i) => {
          const x = (e.time - zero) / delta - scrollX
          return <TlEvent rise={i % 2 === 0 ? 'true' : 'false'} initial={{ left: 0 }} animate={{
            scale: clip(0.0, Math.min(x, 100 - x) * 0.4 + 1, 1.0),
            opacity: clip(0.0, Math.min(x, 100 - x) * 0.4 + 1, 1.0),
            left: isMobile ? `calc(${x}% - 0px)` : `calc(${x}% - 0px)`
          }}>
            {new Date(e.time).toLocaleDateString('sv-SE')}
            <br />
            {i}
            <TlEventPoint />
          </TlEvent>
        })}
        <LineEndArrow active={scrollX < maxWidth - 100} leftSide={false} callback={() => setScrollX(maxWidth)} />
      </TlLine>
    </TlWrapper>
  )
}

const TlWrapper = styled.div`
  display: grid;
  place-items: center;

  width: 100%;
  height: calc(256px + 32px);
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

const TlEvent = styled(motion.div) <{ rise: string }>`
  position: absolute;

  background: #FF000088;
  overflow: visible;
  
  left: 0;

  ${props => props.rise === 'true' ?
    css`bottom: 20px` :
    css`top: 20px`
  };
  
  height: 354px;
  width: 512px;

  @media screen and (max-width: 786px) {
    height: 192px;
    width: 128px;
  }
`

const TlEventPoint = styled.div`
  position: absolute;

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
    <HambugerBun leftSide={leftSide} onClick={() => callback()}>
      <Slice variants={variants.top} animate={active ? 'active' : 'inactive'} />
      <Slice variants={variants.bottom} animate={active ? 'active' : 'inactive'} />
    </HambugerBun>
  )
}

const HambugerBun = styled.div<{ leftSide: boolean }>`
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
