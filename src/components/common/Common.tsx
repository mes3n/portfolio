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
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow-y: scroll;

  --background: url('background.jpg');
  background-image: var(--background);
  background-position: right bottom;
  background-attachment: fixed;
  background-size: cover;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  min-height: 100%;
  padding: 64px 0;
  box-sizing: border-box;

  overflow-x: hidden;
`

export const Title = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 64px;
`

export const Header = styled.h2`
  font-family: 'Ubuntu', sans-serif;
  font-size: 24px;

  font-weight: 500;

  text-align: center;
`

export const Text = styled.p`
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;

  text-align: center;
`

export const Margin = styled.div<{ width?: number, height?: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`
