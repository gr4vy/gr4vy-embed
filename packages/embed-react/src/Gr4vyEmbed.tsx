import { setup } from '@gr4vy/embed'
import React, { useRef, useEffect } from 'react'
import { Props } from './types'

const Gr4vyEmbed = (props: Props) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      setup({
        ...props,
        element: ref.current,
      })
    }
  }, [ref])

  return <div ref={ref} />
}

Gr4vyEmbed.displayName = 'Gr4vyEmbed'

export default Gr4vyEmbed
