import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import { Container, Margin, Title } from '../common/Common'
import { palette } from '../common/Palette'

const About = () => {
  return (
    <Container>
      <Title style={{
        textShadow: `4px 4px ${palette.dark}`
      }}>About Me</Title>
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
      title: 'It begins',
      text: 'I get my first computer, custom built and with Linux.',
      date: Date.parse('2019-6-20'),
    },
    {
      title: 'Hello, World!',
      text: 'Hello, World! My very first program.',
      date: Date.parse('2019-12-17'),
    },
    {
      title: 'Programming',
      text: 'I do something slightly more advanced; Snake 🐍 Ssss...',
      date: Date.parse('2020-4-5'),
    },
    {
      title: 'C/C++',
      text: 'After a bunch more minor projects, I delve into C/C++ with tic-tac-toe.',
      date: Date.parse('2021-1-12'),
    },
    {
      title: 'Gymnasium',
      text: 'I start highschool with a focus on natural sciences.',
      date: Date.parse('2021-8-20'),
    },
    {
      title: 'TI84 ce-t',
      text: 'I develop a space invaders clone for my new calculator.',
      date: Date.parse('2021-9-10'),
    },
    {
      title: 'GitHub',
      text: 'My very first GitHub commit.',
      date: Date.parse('2022-2-27'),
    },
    {
      title: 'New dimension',
      text: 'Curiosity gets to me and I start developing for 3D.',
      date: Date.parse('2022-7-15'),
    },
    // {
    //   title: 'Submarine',
    //   text: 'Together with a friend, I start planning, designing and developing software for a homemade RC submarine.',
    //   date: Date.parse('2022-5-20'),
    // },
    {
      title: 'The wide world of web',
      text: 'I move on to web development and React.',
      date: Date.parse('2022-12-13'),
    },
    {
      title: 'LSSPro',
      text: 'An incredibly fun project aiming to simulate protein folding in silico.',
      date: Date.parse('2023-02-24'),
    },
    {
      title: 'LiTH',
      text: 'I begin my studies towards a master\'s degree in computer science.',
      date: Date.parse('2023-08-15'),
    },
    {
      title: 'Cellda',
      text: 'Yet another scientific project, image detection this time.',
      date: Date.parse('2023-12-20'),
    },
    {
      title: 'Today',
      text: 'And life goes on. Hope you have a great day!',
      date: Date.now(),
    },
  ]

  events.sort((a, b) => a.date > b.date ? 1 : -1)

  const zero = events[0].date
  const max = Date.now()
  const maxWidth = isMobile ? 400 : 200  // in percent
  const maxScrollWidth = maxWidth - (isMobile ? 50 : 80)
  const delta = (max - zero) / maxWidth

  useEffect(() => {
    const handleMouseScroll = (event: WheelEvent) => {
      setScrollX(clip(0, scrollX + event.deltaY * 0.2, maxScrollWidth))
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
        <LineEndArrow active={scrollX > 0} side='left' callback={() => setScrollX(0)} />
        {events.map((event, i) => {
          const x = (event.date - zero) / delta - scrollX
          return <AnimatePresence key={i}>
            <Card $rise={i % 2 === 0} initial={{ left: 0 }} animate={{  // TODO: add slower initial animation
              opacity: clip(0.0, Math.min(x, 80 - x) * 0.4 + 1, 1.0),
              left: isMobile ? `calc(${x}% - 0px)` : `calc(${x}% - 0px)`,
            }}
            >
              <CardTitle>{event.title}</CardTitle>
              <CardDate>
                {new Date(event.date).toLocaleDateString('sv-SE')}
              </CardDate>
              <Margin height={16} />
              <CardDescription>{event.text}</CardDescription>
              <CardPoint $rise={i % 2 === 0} />
            </Card>
          </AnimatePresence >
        })}
        <LineEndArrow active={scrollX < maxScrollWidth} side='right' callback={() => setScrollX(maxScrollWidth)} />
      </TlLine >
    </TlWrapper >
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

  background: ${palette.dark};
  box-shadow: 0 0 4px ${palette.light};
`

const Card = styled(motion.div) <{ $rise: boolean }>`
  position: absolute;
  
  height: 36vh;
  width: 20%;

  color: ${palette.light};

  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;

  ${props => props.$rise
    ? css`
      bottom: 24px;
      border-bottom-left-radius: 0;
      background: linear-gradient(225deg, ${palette.gradient.dark});
    `
    : css`
      top: 24px;
      border-top-left-radius: 0;
      background: linear-gradient(325deg, ${palette.gradient.dark});
    `
  };

  @media screen and (max-width: 786px) {
    height: 30vh;
    width: 50%;
  }
`

const CardPoint = styled.div<{ $rise: boolean }>`
  --size: 12px;
  --aspect: 2;

  position: absolute;

  left: 0;

  height: var(--size);
  aspect-ratio: var(--aspect);

  background: #000c;

  ${props => props.$rise
    ? css`
      top: calc(100%);
      mask: radial-gradient(calc(var(--aspect)*var(--size)) var(--size) at 100% 100%, transparent 94%, #000 98%);
      `
    : css`
      mask: radial-gradient(calc(var(--aspect)*var(--size)) var(--size) at 100% 0, transparent 94%, #000 98%);
      bottom: calc(100%);
    `
  };
`

const CardTitle = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 36px;

  word-break: break-word;

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

const LineEndArrow: React.FC<{ active: boolean, side: 'left' | 'right', callback: Function }> = ({ active, side, callback }) => {
  const variants = {
    top: {
      active: {
        transform: side === 'left' ? 'rotate(-45deg)' : 'rotate(-135deg)'
      },
      inactive: {
        transform: 'rotate(-90deg)'
      },
    },
    bottom: {
      active: {
        transform: side === 'left' ? 'rotate(45deg)' : 'rotate(135deg)'
      },
      inactive: {
        transform: 'rotate(90deg)'

      },
    },
  }

  return (
    <HamburgerBun side={side} onClick={() => callback()}>
      <Slice variants={variants.top} animate={active ? 'active' : 'inactive'} pos={'top ' + side} />
      <Slice variants={variants.bottom} animate={active ? 'active' : 'inactive'} pos={'bottom ' + side} />
    </HamburgerBun>
  )
}

const HamburgerBun = styled.div<{ side: 'left' | 'right' }>`
  position: absolute;

  top: -8px;

  ${props => props.side === 'left' ? css`
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

const Slice = styled(motion.div) <{ pos: string }>`
  height: 8px;
  width: 20px;

  border-radius: 4px;

  background: ${palette.dark};

  ${props => {
    switch (props.pos) {
      case 'top left':
      case 'top right':
        return css`box-shadow: 0 0 4px ${palette.light};`
      case 'bottom left':
        return css`box-shadow: 1px 1px 0.9px ${palette.light};`
      case 'bottom right':
        return css`box-shadow: 1px -1px 0.9px ${palette.light};`
      default:
        return css`box-shadow: none;`
    }
  }}
`

export default About
