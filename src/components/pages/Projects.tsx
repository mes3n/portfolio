import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Container, Title, Text, Margin } from '../common/Common'

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
      name: 'Portfolio',
      date: Date.now(),
      description: 'Website for my personal portfolio, which happens to be this one!',
      languages: ['React', 'Typescript'],
      links: [{ link: 'https://www.github.com/mes3n/portfolio', name: 'source' }, { link: 'https://markus.svedenheim.se', name: 'portfolio' }],
    },
    {
      name: 'Submarine',
      date: Date.now(),
      description: 'Software for a homemade RC-submarine, with help from a friend.',
      languages: ['Dart', 'Flutter', 'C', 'Shell Script'],
      links: [{ link: 'https://www.github.com/mes3n/submarine', name: 'source' }],
      image: 'seaweed.jpg',
      opacity: 0.05,
    },
    {
      name: 'LSSPRO',
      date: Date.now(),
      description: 'Local Small Scale PROtein Folding engine. See image for result...',
      languages: ['Python'],
      links: [{ link: 'https://www.github.com/mes3n/protein-folding', name: 'source' }, { link: 'protein_folding.pdf', name: 'research' }],
      image: 'protein.svg',
    },
    {
      name: 'Skidslip',
      date: Date.now(),
      description: 'Website for a personal business specialising in tuning skis.',
      languages: ['React', 'Typescript'],
      links: [{ link: 'https://www.github.com/mes3n/skidslip', name: 'source' }, { link: 'https://skidslip.svedenheim.se', name: 'skidslip' }],
    },
    {
      name: 'Asteroids',
      date: Date.parse('2022-03-22'),
      description: 'Asteroids clone implemented for TI-84 ce-t graphing calculator.',
      languages: ['C', 'TiCE'],
      links: [{ link: 'https://www.github.com/mes3n/TI-84_asteroids', name: 'source' }],
      image: 'asteroids.jpg',
      opacity: 0.1,
    },
    {
      name: 'Terrain',
      date: Date.parse('2022-09-26'),
      description: '3D terrain generation algorithm with shaders and 3D camera view.',
      languages: ['C', 'OpenGL'],
      links: [{ link: 'https://www.github.com/mes3n/terrain', name: 'source' }],
      image: 'terrain.png',
      opacity: 0.4,
    },
    {
      name: 'Minecraft',
      date: Date.now(),
      description: '3D voxel based Minecraft copy with camera and shaders.',
      languages: ['C++', 'OpenGL'],
      links: [{ link: 'https://www.github.com/mes3n/voxels', name: 'source' }]
    },
    {
      name: 'Rusty Binary Tree',
      date: Date.parse('2023-02-9'),
      description: 'Simple binary tree generation written as my first Rust project.',
      languages: ['Rust'],
      links: [{ link: 'https://www.github.com/mes3n/rusty-tree', name: 'source' }],
      image: 'sakura.png',
      opacity: 0.1,
    },
  ]

  const container = {
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <Container>
      <Margin height={32} />
      <Title>Projects</Title>
      <Margin height={16} />
      <Text>A showcase of some of the more fun projects I have done, or am working on!</Text>
      <Margin height={64} />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {projects.map(project =>
          <ProjectCard
            {...project} />)}
      </motion.div>
    </Container>
  )
}

const ProjectCard: React.FC<ProjectType> = ({ name, date, description, languages, links, image, opacity }) => {

  const item = {
    hidden: { left: '-100%', opacity: 0 },
    show: { left: 'unset', opacity: 1 }
  }

  return (
    <Card
      variants={item}
      transition={{ duration: 0.4 }}
      >
      {image && <CardImage src={image} opacity={opacity} />}
      <CardInfo>
        <CardTitle>{name}</CardTitle>
        <CardDate>{new Date(date).toLocaleDateString('sv-SE')}</CardDate>
        <Margin height={16} />
        <CardDescription>{description}</CardDescription>
      </CardInfo>
      <CardInfo>
        <CardLangs>{languages?.map((lang, i) => lang + (i === languages.length - 1 ? '' : ', '))}</CardLangs>
        <CardLinks>
          {links?.map(link => link.link.includes('https')
            ? <CardLink href={link.link} target='_blank'>
              {link.name}
            </CardLink>
            : <CardLink onClick={() => window.open(link.link)} target='_blank' style={{ textDecoration: 'underline' }}>
              {link.name}
            </CardLink>)}
        </CardLinks>
      </CardInfo>
    </Card>
  )
}

const Card = styled(motion.div)`
  position: relative;

  @media screen and (min-width: 786px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
  }

  background: #0077b6;
  color: #caf0f8;

  overflow: hidden;

  width: min(90%, 1080px);
  border-radius: 16px;

  margin-bottom: 32px;
`

const CardInfo = styled.div`
  position: relative;
  margin: 16px;
`

const CardLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 16px;

  @media screen and (max-width: 786px) {
    gap: 4px;
  }
`

const CardTitle = styled.div`
  font-family: 'Sora', sans-serif;
  font-size: 36px;

  @media screen and (max-width: 786px) {
    font-size: 28px;
  }
`

const CardDate = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 14px;

  @media screen and (max-width: 786px) {
    font-size: 10px;
  }
`

const CardDescription = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 20px;

  @media screen and (max-width: 786px) {
    font-size: 14px;
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

  /* border-radius: 50%; */

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
