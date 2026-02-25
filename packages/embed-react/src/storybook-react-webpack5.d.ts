declare module '@storybook/react-webpack5' {
  export type Meta<TArgs = any> = Record<string, any> & { args?: TArgs }
  export type StoryObj<TArgs = any> =
    | Record<string, any>
    | ({ args?: TArgs; render?: (args: TArgs) => any } & Record<string, any>)
  export type StorybookConfig = any
}
