import Block from '../../core/block'
import Router from '../../core/router'

export default class Link extends Block {
  private readonly router: Router
  constructor (props: Record<string, unknown>) {
    props = {
      ...props,
      events: {
        click: {
          handler: (e: Event) => {
            e.preventDefault()
            console.log('Link clicked')
            // @ts-expect-error
            const href: string = this.props.href
            if (href != null) {
              this.router.go(href)
            }
          },
          capture: false,
        },
      },
    }
    super('button', props)
    this.router = new Router('.app')
  }
}
