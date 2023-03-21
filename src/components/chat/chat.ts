import Block from '../../core/block'
import template from './chat.hbs'
import store from '../../core/store'

export default class Chat extends Block {
  constructor (props: Record<string, unknown>) {
    props = {
      ...props,
      events: {
        click: {
          handler: () => {
            // @ts-expect-error
            if (this.props.id != null && this.props.id !== store.getState().activeChat) {
              // @ts-expect-error
              store.set('activeChat', this.props.id)
            }
          },
          capture: false,
        },
      },
    }
    super('div', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
