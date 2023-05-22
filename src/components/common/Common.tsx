import styled from 'styled-components'

export const pageTransitions = {
  initial: {
    x: -400,
    opacity: 0,
  },
  in: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.1 },
  },
  out: {
    opacity: 0,
    x: 1000,
    transition: { duration: 0.2 },
  },
};

export const RootContainer = styled.div`
  position: fixed;

  width: 100%;
  height: 100%;

  overflow-y: scroll;

  background-color: #caf0f8;
`

export const Container = styled.div`

  display: flex;
  flex-direction: column;

  align-items: center;

  margin-top: 64px;  
`

export const Title = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 64px;
`

export const Header = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 24px;

  text-align: center;
`

export const Text = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;

  text-align: center;
`

export const Margin = styled.div<{width?: number, height?: number}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`
