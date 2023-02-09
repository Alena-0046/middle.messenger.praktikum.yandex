import Block from '../../core/block.ts'
import template from './profile.hbs'

export default class ProfilePage extends Block {
  constructor () {
    const props = {
      save_button: 'Сохранить',
      change_data_button: 'Изменить данные',
      change_password_button: 'Изменить пароль',
      exit_button: 'Выйти',
      fields: [{
        label: 'Почта',
        name: 'email',
        type: 'email',
        val: 'pochta@yandex.ru',
      }, {
        label: 'Логин',
        name: 'login',
        val: 'ivanivanov',
      }, {
        label: 'Имя',
        name: 'first_name',
        val: 'Иван',
      }, {
        label: 'Фамилия',
        name: 'second_name',
        val: 'Иванов',
      }, {
        label: 'Имя в чате',
        name: 'display_name',
        val: 'Иван',
      }, {
        label: 'Телефон',
        name: 'phone',
        type: 'tel',
        val: '+7 (912) 345 67 89',
      }],
      name: 'Иван',
    }
    super('main', 'profile-page', props, {})
  }

  compile (): HTMLElement {
    return template(this.getPropsAndChildren())
  }
}
