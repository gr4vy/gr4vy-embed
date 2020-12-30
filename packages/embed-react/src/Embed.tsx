import { setup } from '@gr4vy/embed'
import React, { useRef, useEffect } from 'react'
import { Props } from './types'

const Gr4vy = (props: Props) => {
  const ref = useRef()

  useEffect(() => {
    setup({
      ...props,
      element: ref.current,
    })
  }, [ref])

  return <div ref={ref} />
}

export default Gr4vy
