import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Container, Margin, Title } from '../common/Common'

const Contact = () => {
  return (
    <Container>
      <Margin height={32} />
      <Title>Contact</Title>
      <Margin height={32} />
      <Card>
        <CardTitle>Gmail</CardTitle>
        <CardLink href='mailto:markus@svedenheim.se' target='_blank'>markus@svedenheim.se</CardLink>
        <CardTitle>Telephone</CardTitle>
        <CardLink href='tel:+46760704029' target='_blank'>+46 76 070 40 29</CardLink>
        <CardTitle>GitHub</CardTitle>
        <CardLink href='https://github.com/mes3n' target='_blank'>mes3n</CardLink>
        <CardTitle>Resume</CardTitle>
        <CardLink onClick={() => window.open('resume.pdf')} target='_blank' style={{ textDecoration: 'underline' }}>open</CardLink>
      </Card>
    </Container>
  )
}

const Card = styled(motion.div)`
  position: relative;

  display: grid;
  grid-template-columns: 1fr 2fr;
  @media screen and (max-width: 786px) {
    grid-template-columns: 1fr 1fr;
  }

  row-gap: 16px;

  padding: 16px;

  background: #0077b6;
  color: #caf0f8;

  overflow: hidden;

  width: min(90%, 1080px);
  border-radius: 16px;

  margin-bottom: 32px;
`

const CardTitle = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 30px;
  
  @media screen and (max-width: 786px) {
    font-size: 20px;
  }
`

const CardLink = styled.a`
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;

  color: inherit;
  cursor: pointer;

  @media screen and (max-width: 786px) {
    font-size: 14px;
  }
`


export default Contact
