import Block from '../../core/block'
import Navigation from '../../components/navigation/navigation'
import template from './home.hbs'

export default class HomePage extends Block {
  constructor () {
    super('main', {
      attr: { class: 'home-page' },
      navigation: new Navigation(),
    })
  }

  render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
