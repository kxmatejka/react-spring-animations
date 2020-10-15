import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import {animated, useChain, useSpring} from 'react-spring'
import {Container} from '../components'

const RelativePositionedContainer = styled(Container)`
  position: relative;
`

const Ball = styled(animated.div)`
  cursor: pointer;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
`

const GreenBall = styled(Ball)`
  background: #41f592;
`

const WhiteBall = styled(Ball)`
  background: #f0f0f0;
  transform: scale(0);
`

const useOpen = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((open) => !open)

  return {
    open,
    toggleOpen
  }
}

interface UseScaleAnimationProps {
  open: boolean,
  fromScale: number,
  toScale: number
}

const useScaleAnimation = ({open, fromScale, toScale}: UseScaleAnimationProps) => {
  const ref = useRef()
  const props = useSpring({
    ref: ref,
    from: {
      transform: `scale(${fromScale})`
    },
    to: {
      transform: open ? `scale(${toScale})` : `scale(${fromScale})`
    }
  })

  return {
    ref,
    props
  }
}

export const Chained = () => {
  const {open, toggleOpen} = useOpen()
  const {ref: greenBallRef, props: greenBallProps} = useScaleAnimation({open, fromScale: 1, toScale: 3})
  const {ref: whiteBallRef, props: whiteBallProps} = useScaleAnimation({open, fromScale: 0, toScale: 1.5})

  useChain(open? [greenBallRef, whiteBallRef]: [whiteBallRef, greenBallRef], [0, open ? 0.1 : 0.6])

  return (
    <RelativePositionedContainer>
      <GreenBall
        onClick={toggleOpen}
        style={greenBallProps}
      />
      <WhiteBall
        onClick={toggleOpen}
        style={whiteBallProps}
      />
    </RelativePositionedContainer>
  )
}
