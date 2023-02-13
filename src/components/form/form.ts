import Block from '../../core/block'
import template from './form.hbs'

export default class Form extends Block {
  constructor (props: Record<string, unknown> = {}) {
    super('form', props)
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
