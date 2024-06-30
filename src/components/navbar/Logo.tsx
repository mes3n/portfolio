import styled from 'styled-components'

const Logo = () => {
  return (
    <Title>Markus S.</Title>
  )
}

const Title = styled.div`
  font-family: 'Source Code Pro', monospace;
  font-size: 48px;

  color: white;
  text-shadow: 2px 2px black;

  margin-left: 16px;

  @media screen and (max-width: 786px) {
    font-size: 24px;

    margin-top: 6px;
    margin-left: 8px;
  }
`

export default Logo
