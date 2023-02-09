import Block from '../../core/block.ts'
import Navigation from '../../components/navigation/navigation.ts'
import template from './home.hbs'

export default class HomePage extends Block {
  constructor () {
    super('main', 'home-page', {}, { navigation: new Navigation() })
  }

  compile (): HTMLElement {
    console.log('HomePage - compile')
    return template(this.getPropsAndChildren())
  }
}
