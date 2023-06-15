import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';


const SettingsButton: React.FC<{ text: String, icon: String, callback: Function }> = ({ callback, text, icon }) => {

  const borderSlide = {
    hover: {
      width: '100%'
    },
    initial: {
      width: 0
    }
  }
  
  const iconSlide = {
    hover: {
      marginRight: '0px',
      marginLeft: '16px'
    },
    initial: {
      marginRight: '8px',
      marginLeft: '8px'
    }
  }

  const controls = useAnimation()

  return (
    <Container onMouseEnter={() => controls.start('hover')} onMouseLeave={() => controls.start('initial')}>
      <ButtonText onClick={() => callback()}>
        {text}
        <IconContainer variants={iconSlide} animate={controls}>
          {icon}
        </IconContainer>
        <Underscore variants={borderSlide} animate={controls} />
      </ButtonText>
    </Container>
  )
}

const ButtonText = styled(motion.p)`
  font-size: 24px;

  cursor: pointer;

  @media screen and (max-width: 786px) {
    font-size: 12px;
  }
`

const IconContainer = styled(motion.span)`
  margin-left: 8px;
  margin-right: 8px;
`

const Underscore = styled(motion.div)`
  margin: 0;

  height: 2px;
  width: 0;

  background: #03045e;
`

const Container = styled.div`
  position: absolute;
  opacity: 0.6;

  bottom: 16px;
  right: 16px;

  color: #03045e;
`


export default SettingsButton
