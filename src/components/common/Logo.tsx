import styled from 'styled-components'

const Logo = () => {
  return (
    <Container>
      <Title>Markus S.</Title>
    </Container>
  )
}

const Container = styled.div`
  width: fit-content;
  height: min-content;

  display: grid;
  place-items: center;

  margin-top: 12px;
  margin-left: 16px;

  @media screen and (max-width: 786px) {
    margin-top: 6px;
    margin-left: 8px;
  }
`

const Title = styled.div`
  font-family: 'Maven Pro', sans-serif;
  font-size: 48px;

  @media screen and (max-width: 786px) {
    font-size: 24px;
  }
`

export default Logo
