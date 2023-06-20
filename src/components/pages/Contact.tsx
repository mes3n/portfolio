import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Container, Margin, Title } from '../common/Common'

const Contact = () => {
  return (
    <Container>
      <Margin height={32} />
      <Title>Contact</Title>
      <Margin height={16} />
      <Card>
        <CardTitle>Gmail</CardTitle>
        <CardText>markus@svedenheim.se</CardText>
        <CardTitle>Telephone</CardTitle>
        <CardText>+46 76 070 40 29</CardText>
        <CardTitle>GitHub</CardTitle>
        <CardText>mes3n</CardText>
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

const CardText = styled.p`
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;

  @media screen and (max-width: 786px) {
    font-size: 14px;
  }
`


export default Contact
