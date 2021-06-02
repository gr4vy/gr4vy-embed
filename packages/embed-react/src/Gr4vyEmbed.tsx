import { setup } from '@gr4vy/embed'
import { SetupConfig } from '@gr4vy/embed/lib/types'
import React, { useRef, useEffect } from 'react'

export type Gr4vyEmbedProps = Omit<SetupConfig, 'element'>

const Gr4vyEmbed = (props: Gr4vyEmbedProps) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      setup({
        ...(props as any),
        element: ref.current,
      })
    }
  }, [ref])

  return <div ref={ref} />
}

Gr4vyEmbed.displayName = 'Gr4vyEmbed'

export default Gr4vyEmbed
