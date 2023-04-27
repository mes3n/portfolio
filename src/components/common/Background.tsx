import motion from 'framer-motion'
import styled from 'styled-components'

const randn_bm = (min: number, max: number): number => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm(min, max) // resample between 0 and 1
  return min + num * (max - min)
}

const Stars = () => {
  return Array.from({length: 1000}, (_: any, i: number) => 
    <Star top={randn_bm(0, 50)} left={randn_bm(0, 100)} radius={randn_bm(5, 20)}/>
  )
}

const Background = () => {
  return (
    <Container>

    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  background: linear-gradient(90deg, #1E1F26 30%, #D0E1F9 30%);
  background: #D0E1F9;
  z-index: -1;
`

// const Container = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;

//   width: 100%;
//   height: 100%;

//   background: linear-gradient(#000157 20%, #051eac 60%, #b92b27 110%);
//   filter: brightness(80%);

//   z-index: -1;
// `

const Star = styled.div<{ top?: number, left?: number, radius?: number }>`
  position: absolute;

  top: ${ (props) => props.top || 5}%;
  left: ${ (props) => props.left || 5}%;

  aspect-ratio: 1;
  /* width: ${ (props) => (props.radius || 5)}px; */

  /* border-radius: 50%; */

  /* background: radial-gradient(rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 80%, rgba(255, 255, 255, 0.0) 100%); */
  background: #fff;
  box-shadow: 0 0 4px 4px #fff;

`


export default Background
