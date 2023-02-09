import Block from '../../core/block.ts'
import template from './error.hbs'

export default class ErrorPage extends Block {
  constructor () {
    super('main', 'error', {}, {})
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
