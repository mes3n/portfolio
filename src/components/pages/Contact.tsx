import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Container, Margin, Title } from '../common/Common'
import { palette } from '../common/Palette'

const Contact = () => {
  return (
    <Container>
      <ContactContainer>
        <Margin height={32} />
        <Title>Contact</Title>
        <Margin height={32} />
        <Card>
          <CardTitle>Gmail</CardTitle>
          <CardLink href='mailto:markus@svedenheim.se' target='_blank'>markus@svedenheim.se</CardLink>
          <CardTitle>LinkedIn</CardTitle>
          <CardLink href='https://www.linkedin.com/in/markus-svedenheim-109b8427b/' target='_blank'>Markus Svedenheim</CardLink>
          <CardTitle>Telephone</CardTitle>
          <CardLink href='tel:+46760704029' target='_blank'>+46 76 070 40 29</CardLink>
          <CardTitle>GitHub</CardTitle>
          <CardLink href='https://github.com/mes3n' target='_blank'>mes3n</CardLink>
        </Card>
      </ContactContainer>
    </Container>
  )
}

const ContactContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;

  border-radius: 48px;
  box-shadow: 0 0 8px 1px ${palette.dark};
  margin: 32px 0;

  width: 70%;
  background: linear-gradient(5deg, ${palette.gradient.dark});

  @media screen and (max-width: 786px) {
    width: 95%;
  }
`

const Card = styled(motion.div)`
  position: relative;

  display: grid;
  grid-template-columns: 1fr 2fr;
  @media screen and (max-width: 786px) {
    grid-template-columns: 1fr 1fr;
  }

  row-gap: 16px;

  padding: 16px;

  background: linear-gradient(180deg, ${palette.blues[0]}, ${palette.blues[1]});
  box-shadow: inset 0 0 8px 4px ${palette.dark};
  color: ${palette.light};

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
