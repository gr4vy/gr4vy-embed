import { setup } from '@gr4vy/embed'
import { SetupConfig } from '@gr4vy/embed/lib/types'
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'

export type Gr4vyEmbedProps = Omit<SetupConfig, 'element'>

export type Gr4vyEmbedInstance = ReturnType<typeof setup>

const Gr4vyEmbed = forwardRef<Gr4vyEmbedInstance, Gr4vyEmbedProps>(
  (props, embedRef) => {
    const ref = useRef()
    const instanceRef = useRef<Gr4vyEmbedInstance>()

    useEffect(() => {
      if (ref.current) {
        instanceRef.current = setup({
          ...(props as any),
          element: ref.current,
        })
      }
    }, [ref])

    useImperativeHandle(embedRef, () => ({
      deselect: () => instanceRef.current.deselect(),
    }))

    return <div ref={ref} />
  }
)

Gr4vyEmbed.displayName = 'Gr4vyEmbed'

export default Gr4vyEmbed
