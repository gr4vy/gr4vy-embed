import { setup } from '@gr4vy/embed'
import { SetupConfig } from '@gr4vy/embed/lib/types'
import isEqual from 'lodash.isequal'
import React, { useRef, useEffect, memo } from 'react'

export type Gr4vyEmbedProps = Omit<SetupConfig, 'element'>

const Gr4vyEmbed = memo((props: Gr4vyEmbedProps) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      setup({
        ...(props as any),
        element: ref.current,
      })
    }
  }, [ref, props])

  return <div ref={ref} />
}, isEqual)

Gr4vyEmbed.displayName = 'Gr4vyEmbed'

export default Gr4vyEmbed
