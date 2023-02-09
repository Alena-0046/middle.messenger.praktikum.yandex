import Block from '../../core/block.ts'
import template from './error.hbs'

export default class ErrorPage extends Block {
  constructor () {
    super('main', 'error-page', {}, {})
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
