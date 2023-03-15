import { setup } from '@gr4vy/embed'
import isEqual from 'lodash.isequal'
import React, {
  useRef,
  useEffect,
  memo,
  forwardRef,
  useImperativeHandle,
} from 'react'
import type { EmbedInstance, SetupConfig } from '@gr4vy/embed/lib/types'

export type Gr4vyEmbedProps = Omit<SetupConfig, 'element' | 'form'> & {
  form?: SetupConfig['form']
}

export type { EmbedInstance }

const Gr4vyEmbed = memo(
  forwardRef<EmbedInstance, Gr4vyEmbedProps>((props, instanceRef) => {
    const ref = useRef()
    const instance = useRef<EmbedInstance>()

    useEffect(() => {
      if (ref.current) {
        instance.current = setup({
          ...(props as any),
          element: ref.current,
        })
      }
    }, [ref, props])

    useImperativeHandle(instanceRef, () => ({
      submit: () => instance.current.submit(),
    }))

    return <div ref={ref} />
  }),
  isEqual
)

Gr4vyEmbed.displayName = 'Gr4vyEmbed'

export default Gr4vyEmbed
