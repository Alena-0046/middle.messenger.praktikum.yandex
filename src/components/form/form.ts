import Block from '../../core/block'
import template from './form.hbs'

export default class Form extends Block {
  constructor (props: Record<string, unknown> = {}) {
    super('form', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
