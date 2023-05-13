import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from './navbar/NavBar'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'

import { RootContainer } from './common/Common'

const Pages = () => {

  let location = useLocation()

  return (
    <RootContainer>
      <NavBar />
      <AnimatePresence mode='wait' initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='*' element={<Msg>404 <br /> Page Not Found</Msg>} />
        </Routes>
      </AnimatePresence>
    </RootContainer>
  )
}

const Msg = styled.div`
  text-align: center;
  margin-top: 128px;

  font-size: 48px;
`


export default Pages
