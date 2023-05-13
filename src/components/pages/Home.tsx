import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, useAnimationControls } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const Home = () => {

  return (
    <>
      <Slide />
      <Menu />
    </>
  )
}

const Slide = () => {

  const isMobile = useMediaQuery({
    query: '(max-width: 786px)'
  })

  const [keyWord, setKeyWord] = useState<string>('DEVELOP')
  const [mousePos, setMousePos] = useState<number | null>(null)

  useEffect(() => {

    if (isMobile) {
      const mouseClickHandler = (event: MouseEvent | TouchEvent) => {
        setKeyWord(keyWord === 'DEVELOP' ? 'IMPROVE' : 'DEVELOP')
      }

      window.addEventListener('mousedown', mouseClickHandler)
      window.addEventListener('touchcancel', mouseClickHandler)

      return () => {
        window.removeEventListener('mousedown', mouseClickHandler)
        window.removeEventListener('touchcancel', mouseClickHandler)
      }
    }
    else {
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
    }

  })

  return (
    <>
      {isMobile
        ? <>
          <Curtain
            color='#caf0f8'>
            <TextPage color='#222'>
              My name is Markus Svedenheim.
              I'm a young developer looking to
              <Fancy color={keyWord === 'DEVELOP' ? '#8338EC' : '#FFBE0B'}>{keyWord}</Fancy> my skills!
            </TextPage>
          </Curtain>
        </>
        : <>
          <Curtain
            // initial={{ width: 0 }}
            // animate={{ width: '100%', transition: { type: 'ease-in-out', duration: 0.5 }}}
            color='#03045e'>
            <TextPage color='#eee'>
              My name is Markus Svedenheim. <br />
              I'm a young developer looking to <br />
              <Fancy color='#90e0ef'>DEVELOP</Fancy> my skills!
            </TextPage>
          </Curtain>
          <Curtain
            initial={{ width: '100%' }}
            animate={{ width: `${Math.max(mousePos || 0, 40)}%` }}
            transition={{ duration: mousePos ? 0.01 : 0.2 }}
            // animate={{ width: '40%', transition: { type: 'just' } }}
            color='#caf0f8'>
            <TextPage color='#222'>
              My name is Markus Svedenheim. <br />
              I'm a young developer looking to <br />
              <Fancy color='#0077b6'>IMPROVE</Fancy> my skills!
            </TextPage>
          </Curtain>
        </>}
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

  let [layout, setLayout] = useState<number>(rand(0, rects.length))
  let [pause, setPause] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) setLayout(rand(0, rects.length))
    }, 5000)
    return () => clearInterval(interval)
  }, [rects.length, pause])

  return (
    <MenuContainer>
      <MenuWrapper onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
        {rects[layout].map((rect, i) =>
          <MenuItem
            rect={rect}
            color={colors[i]}
          />
        )}
      </MenuWrapper>
    </MenuContainer>
  )
}

interface MI {
  rect: {
    left: number,
    top: number,
    height: number,
    width: number
  },
  color: string,
}

const MenuItem: React.FC<MI> = ({ rect, color }) => {

  // TOOD: Width, Height is updated slower which causes bad looking shifts on fast clicking

  let controls = useAnimationControls()
  let [selected, setSelected] = useState<boolean>(false)

  const select = async () => {
    setSelected(true)
    controls.set({ zIndex: 2 })

    controls.start({
      left: '0%',
      top: '0%',
      width: '100%',
      height: '100%',
      transition: { type: 'spring', duration: 0.5 }
    })
  }
  const dismiss = async () => {

    await controls.start({
      left: `${rect.left}%`,
      top: `${rect.top}%`,
      height: `${rect.height}%`,
      width: `${rect.width}%`,
      transition: { type: 'spring', duration: 0.5 }
    })

    controls.set({ zIndex: 1 })
    setSelected(false)
  }
  const shake = async () => {
    if (selected)
      return
    controls.start({ scale: 1.05, transition: { repeat: 1, repeatType: 'mirror', duration: 0.2 } })
  }

  useEffect(() => {
    if (selected)
      return
    controls.start({
      left: `${rect.left}%`,
      top: `${rect.top}%`,
      height: `${rect.height}%`,
      width: `${rect.width}%`,
      scale: 1,
      transition: { type: 'ease-in-out', duration: 0.8 }
    }).then(() => controls.set({ zIndex: 1 }))
  }, [rect, controls, selected])

  return (
    <MenuItemWrapper
      color={color}
      initial={{
        left: `${rect.left}%`,
        top: `${rect.top}%`,
        height: 0,
        width: 0,
      }}
      animate={controls}
      onClick={() => selected ? dismiss() : select()}
      onHoverStart={() => shake()}
    />
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
  color: ${props => props.color};

  margin-top: 20vh;
  margin-left: 55vw;

  white-space: nowrap;

  font-family: 'Ubuntu', sans-serif;
  font-size: 48px;

  @media screen and (max-width: 786px) {
    font-size: 24px;
    white-space: normal;

    margin-left: auto;

    width: 80%;
    margin-top: 16vh;
    margin-left: 10%;
  }
`

const Fancy = styled.div`
  color: ${props => props.color};
  margin-left: 4px;

  font-family: 'Maven Pro', sans-serif;

  display: inline-block;

  @media screen and (max-width: 786px) {
    width: 110px;
  }
`

const MenuContainer = styled.div`
  position: absolute;
  
  width: 40%;
  height: 100%;

  z-index: 1;

  overflow: hidden;

  @media screen and (max-width: 786px) {
    width: 100%;
    height: 64%;

    bottom: 0;
  }
`

const MenuWrapper = styled.div`
  position: relative;

  width: 90%;
  height: 50%;
  margin: 0 auto;
  top: 45%;

  @media screen and (max-width: 786px) {
    height: 80%;
    top: 15%;
  }

`

const MenuItemWrapper = styled(motion.div) <{ color: string }>`

  position: absolute;

  background-color: ${(props) => props.color};
  border-radius: 16px;

  scale: 1;

  /* overflow: hidden; */
`


export default Home
