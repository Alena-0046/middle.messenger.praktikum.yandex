import Block from '../../core/block'
import Link from '../../components/link/link'
import template from './error.hbs'

export default class ErrorPage extends Block {
  constructor () {
    super('main', {
      attr: { class: 'error-page' },
      link: new Link({
        attr: {
          textContent: 'Назад к чатам',
          href: '#user',
        },
      }),
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
