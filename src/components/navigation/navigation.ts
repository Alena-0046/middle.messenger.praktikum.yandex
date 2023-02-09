// import { PageIds } from '../../app.ts'
import Block from '../../core/block.ts'
import template from './navigation.hbs'

const Pages = [
  { url: '#login', text: 'Страница авторизации' },
  { url: '#signup', text: 'Страница регистрации' },
  { url: '#user', text: 'Страница пользователя' },
  { url: '#profile', text: 'Страница профиля' },
  { url: '#error', text: 'Страница ошибок' },
  // { url:'./404', text:'Страница 404'},
  // { url:'./5xx', text:'Страница 5хх ошибок'},
]

export default class HomePage extends Block {
  constructor () {
    const props = { pages: Pages }
    super('nav', 'navigation', props, {})
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
