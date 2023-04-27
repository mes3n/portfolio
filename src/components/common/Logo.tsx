import styled from 'styled-components'

const Logo = () => {
  return (
    <Container>
      <Title>Markus S.</Title>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: fit-content;

  display: grid;
  place-items: center;

  margin-top: 16px;
  margin-left: 16px;
`

const Title = styled.div`
  font-family: 'Maven Pro', sans-serif;
  font-size: 48px;
`

export default Logo
