import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import { Container, Title, Header, Margin } from '../common/Common'
import { palette } from '../common/Palette'

interface ProjectType {
  name: string,
  date: number,
  description: string,
  languages?: Array<string>,
  links?: Array<{ link: string, name: string }>,
  image?: string,
  opacity?: number,
}

const Projects = () => {

  const projects: Array<ProjectType> = [
    {
      name: 'Submarine',
      date: Date.parse('2023-12-14'),
      description: 'Software for a homemade RC-submarine, with help from a friend.',
      languages: ['Dart', 'Flutter', 'C', 'Shell Script'],
      links: [
        { link: 'https://github.com/mes3n/submarine', name: 'source' },
        { link: 'https://github.com/mes3n/submarine-mainframe', name: 'app' },
        { link: 'https://github.com/mes3n/submarine-ui', name: 'ui' },
      ],
      image: 'seaweed.jpg',
      opacity: 0.05,
    },
    {
      name: 'LSSPro',
      date: Date.parse('2023-02-24'),
      description: 'Local Small Scale Protein folding engine. A research project with a friend.',
      languages: ['Python'],
      links: [{ link: 'https://github.com/mes3n/protein-folding', name: 'source' }, { link: 'protein_folding.pdf', name: 'research' }],
      image: 'protein.svg',
    },
    {
      name: 'Portfolio',
      date: Date.parse('2024-07-01'),
      description: 'Website for my personal portfolio, which happens to be this one!',
      languages: ['React', 'Typescript'],
      links: [{ link: 'https://github.com/mes3n/portfolio', name: 'source' }, { link: 'https://markus.svedenheim.se', name: 'portfolio' }],
      image: 'background.jpg',
      opacity: 0.4,
    },
    {
      name: 'Raytracer',
      date: Date.parse('2024-02-03'),
      description: 'Raytracer implemented in C, with help from the book "Ray Tracing in One Weekend".',
      languages: ['C'],
      links: [{ link: 'https://github.com/mes3n/raytracing', name: 'source' }],
      image: 'rtweekend.png',
    },
    {
      name: 'Asteroids',
      date: Date.parse('2022-03-22'),
      description: 'Asteroids clone implemented for TI-84 ce-t graphing calculator.',
      languages: ['C', 'TiCE'],
      links: [{ link: 'https://github.com/mes3n/TI-84_asteroids', name: 'source' }],
      image: 'asteroids.jpg',
      opacity: 0.1,
    },
    {
      name: 'Terrain',
      date: Date.parse('2022-09-26'),
      description: '3D terrain generation algorithm with shaders and 3D camera view.',
      languages: ['C', 'OpenGL'],
      links: [{ link: 'https://github.com/mes3n/terrain', name: 'source' }],
      image: 'terrain.png',
      opacity: 0.4,
    },
    {
      name: 'HTTPS Server',
      date: Date.parse('2023-11-8'),
      description: 'Simple HTTPS Server implemented in Rust with an IPC interface.',
      languages: ['Rust'],
      links: [{ link: 'https://github.com/mes3n/https_server', name: 'source' }],
    },
  ]

  const list = {
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <Container>
      <ProjectContainer>
        <Margin height={32} />
        <Title>Projects</Title>
        <Margin height={16} />
        <Header>A showcase of some of the more fun projects I have done, or am working on!</Header>
        <Margin height={64} />
        <AnimatePresence>
          <motion.div
            variants={list}
            initial='hidden'
            animate='show'
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {projects.map((project, i) => <ProjectCard {...project} index={i} key={i} />)}
          </motion.div>
        </AnimatePresence>
      </ProjectContainer>
    </Container>
  )
}

interface ProjectTypeWithIndex extends ProjectType { index: number }
const ProjectCard: React.FC<ProjectTypeWithIndex> = ({ name, date, description, languages, links, image, opacity, index }) => {

  const item = {
    hidden: { left: '-100%', opacity: 0 },
    show: { left: 'unset', opacity: 1 }
  }

  return (
    <Card
      color={palette.blues[index % (palette.blues.length)]}
      variants={item}
      transition={{ duration: 0.4 }}>
      {image && <CardImage src={image} opacity={opacity} />}
      <CardInfo>
        <CardTitle>{name}</CardTitle>
        <CardDate>{new Date(date).toLocaleDateString('sv-SE')}</CardDate>
        <Margin height={16} />
        <CardDescription>{description}</CardDescription>
      </CardInfo>
      <CardInfo>
        <CardLangs>
          {languages?.join(', ')}
        </CardLangs>
        <CardLinks>
          {links?.map((link, i) => link.link.includes('https')
            ? <CardLink href={link.link} target='_blank' key={i}>
              {link.name}
            </CardLink>
            : <CardLink onClick={() => window.open(link.link)} target='_blank' style={{ textDecoration: 'underline' }} key={i}>
              {link.name}
            </CardLink>)}
        </CardLinks>
      </CardInfo>
    </Card>
  )
}

const ProjectContainer = styled.div`
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

  @media screen and (min-width: 786px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
  }

  background: ${props => props.color};
  box-shadow: inset 0 0 8px ${palette.dark};
  color: ${palette.light};
  text-shadow: 1px 1px ${palette.dark};

  overflow: hidden;

  width: min(90%, 1080px);
  border-radius: 16px;

  margin-bottom: 32px;
`

const CardInfo = styled.div`
  position: relative;
  margin: 16px;
`

const CardLinks = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 16px;

  @media screen and (max-width: 786px) {
    gap: 4px;
  }
`

const CardTitle = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 36px;

  @media screen and (max-width: 786px) {
    font-size: 28px;
  }
`

const CardDate = styled.p`
  font-family: 'Ubuntu', sans-serif;
  font-size: 14px;

  font-style: italic;

  @media screen and (max-width: 786px) {
    font-size: 10px;
  }
`

const CardDescription = styled.p`
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;

  @media screen and (max-width: 786px) {
    font-size: 14px;
    font-weight: 300;
  }
`

const CardLangs = styled(CardDate)`
  font-style: italic;

  @media screen and (min-width: 786px) {
    text-align: right;
    margin: 16px;
  }
`

const CardLink = styled.a`
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;

  color: inherit;
  text-align: right;

  cursor: pointer;

  @media screen and (max-width: 786px) {
    font-size: 12px;
  }
`

const CardImage = styled.div<{ src: string, opacity?: number }>`
  position: absolute;
  
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;

  opacity: ${props => props.opacity || 0.2};

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 786px) {
    top: -25%;
    left: -25%;
    width: 150%;
    height: 150%;
  }
`

export default Projects
