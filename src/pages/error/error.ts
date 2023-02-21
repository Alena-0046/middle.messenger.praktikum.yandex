import Block from '../../core/block'
import template from './error.hbs'

export default class ErrorPage extends Block {
  constructor () {
    super('main', { attr: { class: 'error-page' } })
  }

  render (): string {
    return template(this.getPropsAndChildren())
  }
}
