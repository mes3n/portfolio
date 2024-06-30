import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import Button from '../common/Button'
import { RootContainer } from '../common/Common'
import { palette } from '../common/Palette'

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

  const [keyword, setKeyword] = useState<string>('DEVELOP')
  const [mousePos, setMousePos] = useState<number | null>(null)

  useEffect(() => {
    if (isMobile) {
      const mouseClickHandler = (_: MouseEvent | TouchEvent) => {
        setKeyword(keyword === 'DEVELOP' ? 'UTILIZE' : 'DEVELOP')
      }

      window.addEventListener('mousedown', mouseClickHandler)
      window.addEventListener('touchcancel', mouseClickHandler)
    }
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
      if (isMobile) {
        window.removeEventListener('mousedown', handleMouse)
        window.removeEventListener('touchcancel', handleMouse)
      }
    }
  })

  return (
    <>
      {isMobile
        ? <>
          <AnimatePresence>
            <Curtain
              initial={{ width: '100%' }}
              animate={{ width: `${Math.max(mousePos || 0, 2)}%` }}
              transition={{ duration: 0.8 }}>
            </Curtain>
          </AnimatePresence>
          <TextPage color={palette.light}>
            My name is Markus Svedenheim. <br />
            I'm a fresh developer looking to <br />
            <Fancy color={keyword === 'DEVELOP' ? palette.blue : palette.dark}>{keyword}</Fancy> my skills!
          </TextPage>
        </>
        : <>
          <TextPage color={palette.dark}>
            My name is Markus Svedenheim. <br />
            I'm a fresh developer looking to <br />
            <Fancy color={palette.light}>DEVELOP</Fancy> my skills!
          </TextPage>
          <AnimatePresence>
            <Curtain
              initial={{ width: '100%' }}
              animate={{ width: `${Math.max(mousePos || 0, 40)}%` }}
              transition={{ duration: mousePos ? 0.01 : 0.8 }}>
              <TextPage color={palette.light}>
                My name is Markus Svedenheim. <br />
                I'm a fresh developer looking to <br />
                <Fancy color={palette.blue}>UTILIZE</Fancy> my skills!
              </TextPage>
            </Curtain>
          </AnimatePresence>
        </>}
    </>
  )
}

const Curtain = styled(motion(RootContainer))`
  box-shadow: 0 0 8px 1px black;
  background-image: linear-gradient(5deg, ${palette.gradient.dark}),
                    var(--background);

  overflow: hidden;
  z-index: 1;

  @media screen and (max-width: 786px) {
    background: linear-gradient(5deg, ${palette.gradient.dark});
  }
`

const TextPage = styled.h1`
  position: absolute;
  top: 15vh;
  left: 45vw;

  color: ${props => props.color};

  white-space: nowrap;

  font-family: 'Ubuntu', sans-serif;
  font-size: 2.4vw;
  text-shadow: 0.1vw 0.1vw ${palette.gray};

  font-weight: 300;

  @media screen and (max-width: 786px) {
    font-size: 24px;
    white-space: normal;

    margin-left: auto;

    width: 80%;
    top: 16vh;
    left: 10vw;
  }
`

const Fancy = styled.span`
  color: ${props => props.color};

  font-family: 'Source Code Pro', monospace;

  @media screen and (max-width: 786px) {
    width: 110px;
  }
`

const Menu = () => {

  const navigate = useNavigate()

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

  const MenuItemTitle = styled.h1`
    opacity: 0.6;
    font-size: 32px;
    text-transform: capitalize;

    @media screen and (max-width: 786px) {
      font-size: 20px;
    }
  `

  const MenuItemText = styled.p`
    opacity: 0.4;
    font-size: 24px;
    margin: 8px 0 16px;

    @media screen and (max-width: 786px) {
      font-size: 12px;
    }
  `

  const menuItems = [
    {
      'name': 'Projects',
      'color': palette.blues[0],
      'content': (
        <motion.div style={{ margin: 16 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: 0.2 }}>
          <MenuItemTitle>A slice of my work</MenuItemTitle>
          <MenuItemText>
            My achievements in programming are molded by exploring new ideas!
            Everything between backend, frontend and game development.
            As well as a dash of computational molecular biology.
          </MenuItemText>
          <Button text={'Projects'} icon={'➔'} callback={() => navigate('/projects')} />
        </motion.div>
      ),
    },
    {
      'name': 'Contact',
      'color': palette.blues[1],
      'content': (
        <motion.div style={{ margin: 16 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: 0.2 }}>
          <MenuItemTitle>How To Reach Me</MenuItemTitle>
          <MenuItemText>
            If you find my work and experience to be of interest, please feel free to reach out to me!
          </MenuItemText>
          <Button text={'Contact Me'} icon={'➔'} callback={() => navigate('/contact')} />
        </motion.div>
      ),
    },
    {
      'name': 'About',
      'color': palette.blues[2],
      'content': (
        <motion.div style={{ margin: 16 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: 0.2 }}>
          <MenuItemTitle>Who am I?</MenuItemTitle>
          <MenuItemText>
            My entry into programming is grounded in my curious nature,
            I have always loved both exploration and problem solving.
            In my opinion these are the core aspects of programming!
          </MenuItemText>
          <MenuItemTitle>What have I done?</MenuItemTitle>
          <MenuItemText>
            During my journey into the world of programming,
            I have explored multiple languages, libraries, and possibilities!
          </MenuItemText>
          <Button text={'Read More'} icon={'➔'} callback={() => navigate('/about')} />
        </motion.div>
      ),
    },
    {
      // Wildcard is in development
      // Final result is hopefully an actual wildcard randomly picking a fact
      'name': 'Wildcard',
      'color': palette.blues[3],
      'content': (
        <motion.div style={{ margin: 16 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: 0.2 }}>
          <MenuItemTitle>LSSPro</MenuItemTitle>
          <MenuItemText>
            This has to be the most interesting project I have done:
            A computation molecular dynamics simulation aimed at simulating
            the folding process of an arbitrary protein from its amino acid sequence.
          </MenuItemText>
          <MenuItemText>Local Small Scale Protein folding engine</MenuItemText>
        </motion.div>
      ),
    },
  ]

  const rand = (min: number, max: number) => Math.floor(min + Math.random() * (max - min))

  let [layout, setLayout] = useState<number>(rand(0, rects.length))

  let interval: NodeJS.Timer
  const startInterval = () => {
    interval = setInterval(() => {
      setLayout(rand(0, rects.length))
    }, 5000)
  }

  const stopInterval = () => {
    clearInterval(interval!)
  }

  useEffect(() => {
    startInterval()
    return stopInterval
  })

  return (
    <MenuContainer>
      <MenuWrapper onMouseEnter={stopInterval} onMouseLeave={startInterval}>
        {rects[layout].map((rect, i) =>
          <MenuItem
            rect={rect}
            name={menuItems[i].name}
            color={menuItems[i].color}
            key={i}
          >
            {menuItems[i].content}
          </MenuItem>
        )}
      </MenuWrapper>
    </MenuContainer>
  )
}

const MenuContainer = styled.div`
  position: absolute;

  width: 40%;
  height: 100%;
  bottom: 0;

  z-index: 1;

  overflow: hidden;

  @media screen and (max-width: 786px) {
    width: 100%;
    height: 64%;
  }
`

const MenuWrapper = styled.div`
  position: relative;

  top: 45%;
  width: 90%;
  height: 50%;
  margin: 0 auto;

  @media screen and (max-width: 786px) {
    top: 15%;
    height: 80%;
  }
`

interface MI {
  rect: {
    left: number,
    top: number,
    height: number,
    width: number
  },
  name: string,
  color: string,
  children: PropsWithChildren<ReactNode>
}

const MenuItem: React.FC<MI> = ({ rect, name, color, children }) => {

  let controls = useAnimationControls()
  let [selected, setSelected] = useState<boolean>(false)
  let [animating, setAnimating] = useState<boolean>(false)

  let [reveal, setReveal] = useState<boolean>(false)

  const select = async () => {
    setAnimating(true)
    setReveal(true)

    controls.set({ zIndex: 2 })
    await controls.start({
      left: '0%',
      top: '0%',
      width: '100%',
      height: '100%',
      transition: { type: 'spring', duration: 0.5 }
    })

    setSelected(true)
  }
  const dismiss = async () => {
    setAnimating(true)
    setReveal(false)

    await controls.start({
      left: `${rect.left}%`,
      top: `${rect.top}%`,
      height: `${rect.height}%`,
      width: `${rect.width}%`,
      transition: { type: 'spring', duration: 0.5 }
    }).then(() => controls.set({ zIndex: 1 }))

    setSelected(false)
  }
  const shake = async () => {
    if (selected || animating)
      return

    setAnimating(true)
    controls.start({ scale: 1.05, transition: { repeat: 1, repeatType: 'mirror', duration: 0.2 } })
  }

  useEffect(() => {
    if (selected || animating)
      return

    setAnimating(true)
    controls.start({
      left: `${rect.left}%`,
      top: `${rect.top}%`,
      height: `${rect.height}%`,
      width: `${rect.width}%`,
      scale: 1,
      transition: { duration: 0.8 }
    }).then(() => controls.set({ zIndex: 1 }))

  }, [rect, controls, selected, animating])

  return (
    <MenuItemWrapper
      color={color}
      transition={{ duration: 0.2 }}
      animate={controls}
      onClick={(reveal === selected) ? (() => selected ? dismiss() : select()) : (() => { })}  // logic is to prevent double click spamming
      onHoverStart={() => shake()}
      onAnimationComplete={() => setAnimating(false)}
    >
      <MenuItemName animate={{ opacity: reveal ? 0.4 : 0.08 }}>{name}</MenuItemName>
      <AnimatePresence>
        {reveal && children}
      </AnimatePresence>
    </MenuItemWrapper>
  )
}

const MenuItemWrapper = styled(motion.div)`
  position: absolute;
  overflow: hidden;

  background: ${props => props.color};
  border-radius: 16px;

  box-shadow: inset 0 0 4px 2px ${palette.gray};

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  cursor: pointer;
`

const MenuItemName = styled(motion.h1)`
  font-size: 64px;
  margin: 16px 16px 0;

  color: transparent;

  text-align: center;
  text-transform: uppercase;

  overflow-wrap: break-word;

  text-shadow: 0 0 8px black, 0 0 1px black;

  user-select: none;

  @media screen and (max-width: 786px) {
    font-size: 32px;
  }
`


export default Home
