import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <>
      <Slide />
      <Menu />
    </>
  )
}

const Slide = () => {
  const [mousePos, setMousePos] = useState<number>(40)

  useEffect(() => {
    const handleMouse = (event: TouchEvent | MouseEvent) => {
      if (event instanceof MouseEvent) {
        setMousePos(event.x / window.innerWidth * 100)
      } else if (event instanceof TouchEvent) {
        setMousePos(event.touches[0].clientX / window.innerWidth * 100)
      }
    }

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('touchmove', handleMouse)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('touchmove', handleMouse)
    }
  })

  return (
    <>
      <Curtain
        color='#03045e'>
        <TextPage color='#eee'>
          My name is Markus Svedenheim. <br />
          I'm a young developer looking to <br />
          <Fancy color='#90e0ef'>DEVELOP</Fancy> my skills!
        </TextPage>
      </Curtain>
      <Curtain
        animate={{ width: `${Math.max(mousePos, 40)}%` }}
        transition={{ type: 'spring', duration: 0.1 }}
        color='#caf0f8'>
        <TextPage color='#222'>
          My name is Markus Svedenheim. <br />
          I'm a young developer looking to <br />
          <Fancy color='#0077b6'>IMPROVE</Fancy> my skills!
        </TextPage>
      </Curtain>
    </>
  )
}

const Menu = () => {

  let rects = [
    [{
      left: 0,
      top: 52,
      height: 48,
      width: 32,
    }, {
      left: 2,
      top: 0,
      height: 50,
      width: 64,
    }, {
      left: 68,
      top: 0,
      height: 100,
      width: 32,
    }, {
      left: 34,
      top: 54,
      height: 42,
      width: 32,
    }],
    [{
      left: 32,
      top: 0,
      height: 38,
      width: 68,
    }, {
      left: 0,
      top: 52,
      height: 48,
      width: 58,
    }, {
      left: 0,
      top: 0,
      height: 50,
      width: 30,
    }, {
      left: 60,
      top: 42,
      height: 54,
      width: 38,
    }],
    [{
      left: 0,
      top: 0,
      height: 50,
      width: 30,
    }, {
      left: 32,
      top: 0,
      height: 50,
      width: 68,
    }, {
      left: 72,
      top: 52,
      height: 48,
      width: 28,
    }, {
      left: 0,
      top: 52,
      height: 48,
      width: 70,
    }]
  ]
  const colors = [
    '#FFBE0B',
    '#FB5607',
    '#FF006E',
    '#8338EC',
  ]

  const rand = (min: number, max: number) => Math.floor(min + Math.random() * (max - min))

  let [layout, setLayout] = useState<number>(0)
  let [pause, setPause] = useState<boolean>(false)
  let [selected, setSelected] = useState<number | null>()

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) setLayout(rand(0, rects.length))
    }, 2000)
    return () => clearInterval(interval)
  }, [rects.length, pause])

  return (
    <MenuContainer>
      <MenuWrapper onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
        {rects[layout].map((r, i) =>
          <MenuItem color={colors[i]}
            animate={i === selected ? {
              left: '0%',
              top: '-20%',
              width: '100%',
              height: '135%',
              zIndex: 2,
              transition: {
                type: 'ease-in-out',
                duration: 0.75,
                zIndex: {
                  delay: 0,
                },
              },
            } : {
              left: `${r.left}%`,
              top: `${r.top}%`,
              height: `${r.height}%`,
              width: `${r.width}%`,
              zIndex: 1,
            }}
            transition={{ type: 'ease-in-out', duration: 0.75, zIndex: { delay: 0.75, duration: 0 } }}
            onClick={() => setSelected(i === selected ? null : i)}
          >
          </MenuItem>)}
      </MenuWrapper>
    </MenuContainer>
  )
}

const Curtain = styled(motion.div)`
  background: ${(props) => props.color};
  width: 100%;
  height: 100%;

  overflow: hidden;
  position: absolute;

  z-index: 1;
`

const TextPage = styled.div`
  color: ${(props) => props.color};

  margin-top: 20vh;
  margin-left: 55vw;

  white-space: nowrap;

  font-family: 'Ubuntu', sans-serif;
  font-size: 48px;
`

const Fancy = styled.div`
  color: ${(props) => props.color};
  margin-left: 4px;

  font-family: 'Maven Pro', sans-serif;

  display: inline-block;
`

const MenuContainer = styled.div`
  position: absolute;
  
  width: 40%;
  height: 100%;

  z-index: 1;
`

const MenuWrapper = styled.div`
  position: relative;

  /* aspect-ratio: 1.618; */
  width: 90%;
  height: 50%;
  margin: 0 auto;
  top: 40%;

  /* margin-top: 50%; */
`

const MenuItem = styled(motion.div)`

  position: absolute;

  background-color: ${(props) => props.color || '#000'};
  border-radius: 16px;

  /* overflow: hidden; */
`


export default Home
