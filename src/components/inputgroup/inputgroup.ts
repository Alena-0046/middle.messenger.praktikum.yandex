import Block from '../../core/block'
import Label from '../../components/label/label'
import Input from '../../components/input/input'
import Span from '../../components/span/span'
import template from './inputgroup.hbs'

export default class InputGroup extends Block {
  constructor (className: string, type: string) {
    const inputData = {
      email: {
        text: 'Почта',
        name: 'email',
        type: 'email',
        span: 'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
      },
      login: {
        text: 'Логин',
        name: 'login',
        type: 'text',
        span: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
      },
      nick: {
        text: 'Имя в чатах',
        name: 'name',
        type: 'text',
        span: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
      },
      first_name: {
        text: 'Имя',
        name: 'first_name',
        type: 'text',
        span: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
      },
      second_name: {
        text: 'Фамилия',
        name: 'second_name',
        type: 'text',
        span: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
      },
      phone: {
        text: 'Телефон',
        name: 'phone',
        type: 'tel',
        span: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
      },
      password: {
        text: 'Пароль',
        name: 'password',
        type: 'password',
        span: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      },
      password_repeat: {
        text: 'Пароль (ещё раз)',
        name: 'password',
        type: 'password',
        span: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      },
    }
    console.log(inputData[type].text)

    const props = {
      attr: { class: 'input-group' },
      order: className,
      label: new Label({
        attr: { class: 'signup-page__label' },
        text: inputData[type].text,
      }),
      input: new Input({
        attr: {
          name: inputData[type].name,
          type: inputData[type].type,
        },
      }),
      span: new Span({ text: inputData[type].span }),
    }

    super('div', props)
  }

  render (): string {
    this.children.span.hide()
    return template(this.getPropsAndChildren())
  }

  static validate (): boolean {
    const fields = {}
    let result = true
    const className = 'input-group'
    const groups = document.querySelectorAll('.' + className)

    groups.forEach((group) => {
      const input = group.children[0].children[1] as HTMLInputElement
      const span = group.children[1] as HTMLElement

      if (this.validateInput(input)) {
        console.log('OK, ' + input.name + ': ' + input.value)
        span.style.display = 'none'
      } else {
        result = false
        span.style.display = 'block'
        console.log('Validation failed: ' + input.name + ': ' + input.value)
      }
      fields[input.name] = input.value
    })

    return result
  }

  static validateInput (input: HTMLInputElement): boolean {
    if (input.value === null || input.value === '') {
      return false
    }
    const name = /^[A-ZЁА-Я][A-Za-zЁёА-Яа-я-]+$/ // new RegExp('^[ЁА-ЯA-Z]+[ЁёА-Яа-я-]$')
    const login = /^(?=.*[A-Za-z])[A-Za-z0-9]{3,20}$/ // new RegExp('^(?=.*[A-Za-z])[A-Za-z0-9]{3,20}$')
    const email = /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/ // new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z]+.[A-Za-z]$')
    const password = /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/ // new RegExp('^(?=.*[A-Z])(?=.*[0-9]).{8,40}$')
    const phone = /^\+?[0-9]{10,15}$/ // new RegExp('^[\+]?[0-9]{10,15}$')
    const message = /^.+$/ // new RegExp('^.+$')

    let result = true

    switch (input.name) {
      case 'first_name':
      case 'second_name':
        result = name.test(input.value)
        break
      case 'login':
        result = login.test(input.value)
        break
      case 'email':
        result = email.test(input.value)
        break
      case 'password':
        result = password.test(input.value)
        break
      case 'phone':
        result = phone.test(input.value)
        break
      case 'message':
        result = message.test(input.value)
        break
      default:
        break
    }
    return result
  }
}
