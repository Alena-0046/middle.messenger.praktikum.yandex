import Block from '../../core/block'
import Link from '../../components/link/link'
import template from './leftpanel.hbs'

export default class LeftPanel extends Block {
  constructor () {
    const props = {
      attr: { class: 'left-panel' },
      link: new Link({
        attr: {
          class: 'left-panel__link',
          textContent: 'Профиль >',
        },
        href: '/settings',
      }),
    }
    super('div', props)
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
