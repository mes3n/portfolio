import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'

import NavBar from '../navbar/NavBar'

import Home from './Home'
import About from './About'
import Contact from './Contact'

import { Container } from '../common/Common'

const Pages = () => {

  let location = useLocation()

  return (
    <Container>
      <NavBar />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<></>} />
        </Routes>
      </AnimatePresence>
    </Container>
  )
}


export default Pages
