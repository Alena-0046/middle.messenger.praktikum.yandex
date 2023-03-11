import Block from '../../core/block'
import Router from '../../core/router'

export default class Link extends Block {
  private readonly router: Router
  constructor (props: Record<string, unknown>) {
    props = {
      ...props,
      events: {
        click: {
          handler: (e) => {
            e.preventDefault()
            console.log('Link clicked')
            if (this.props.href) {
              this.router.go(this.props.href)
            }
          },
          capture: false,
        },
      },
    }
    super('button', props)
    this.router = new Router()
  }
}
