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
        name: 'display_name',
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
      old_password: {
        text: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        span: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      },
      password: {
        text: 'Пароль',
        name: 'password',
        type: 'password',
        span: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      },
      password_repeat: {
        text: 'Пароль (ещё раз)',
        name: 'newPassword',
        type: 'password',
        span: 'пароли не совпали',
      },
    }

    const props = {
      attr: { class: 'input-group' },
      order: className,
      label: new Label({
        attr: {
          class: 'signup-page__label',
          // @ts-expect-error
          textContent: inputData[type].text,
        },
      }),
      input: new Input({
        attr: {
          // @ts-expect-error
          name: inputData[type].name,
          // @ts-expect-error
          type: inputData[type].type,
        },
        events: {
          focus: {
            handler: () => {
              // Do not validate input on focus event
              // Users won't see red labels after clicking on input

              // if(e.target != null && e.target instanceof HTMLInputElement) {
              //  InputGroup.validateInputGroup(e.target)
              // }
            },
            capture: true,
          },
          blur: {
            handler: (e: Event) => {
              if (e.target != null) {
                // @ts-expect-error
                InputGroup.validateInputGroup(e.target)
              }
            },
            capture: true,
          },
        },
      }),
      // @ts-expect-error
      span: new Span({ attr: { textContent: inputData[type].span } }),
    }

    super('div', props)
  }

  render (): DocumentFragment {
    if (!Array.isArray(this.children.span)) {
      this.children.span.hide()
    }
    return this.compile(template, this.props)
  }

  static validate (): object | null {
    let isValid = true
    const fields = {}
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
      if (!InputGroup.validateInputGroup(input)) {
        console.log('Validate failed')
        isValid = false
      }
      // @ts-expect-error
      fields[input.name] = input.value
    })
    return isValid ? fields : null
  }

  static validateInputGroup (input: HTMLInputElement): boolean {
    const span = input.parentNode!.parentNode!.querySelector('span') as HTMLSpanElement

    if (this.validateInput(input)) {
      // console.log('OK, ' + input.name + ': ' + input.value)
      span.style.display = 'none'
      return true
    } else {
      span.style.display = 'block'
      console.log('Validation failed: ' + input.name + ': ' + input.value)
      return false
    }
  }

  static validateInput (input: HTMLInputElement): boolean {
    if (input.value === null || input.value === '') {
      return false
    }
    const name = /^[A-ZЁА-Я][A-Za-zЁёА-Яа-я-]*$/ // new RegExp('^[ЁА-ЯA-Z]+[ЁёА-Яа-я-]$')
    const login = /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/ // new RegExp('^(?=.*[A-Za-z])[A-Za-z0-9]{3,20}$')
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
      case 'oldPassword':
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
