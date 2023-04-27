import styled from 'styled-components'


const About = () => {
  return (
    <Container>
      <Title>Hello there!</Title>
      <Text>This is me and im a cool guy im also a developer and i have done some pretty fun work</Text>
      <Text>This is me and im a cool guy im also a developer and i have done some pretty fun work</Text>
      <Text>This is me and im a cool guy im also a developer and i have done some pretty fun work</Text>
      <Text>This is me and im a cool guy im also a developer and i have done some pretty fun work</Text>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;

  padding-top: 20vh;  
`

const Title = styled.div`
  font-family: 'Maven Pro', sans-serif;
  font-size: 64px;
`

const Text = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 24px;
`


export default About
