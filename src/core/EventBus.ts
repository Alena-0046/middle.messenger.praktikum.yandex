export class EventBus {
  private listeners: object

  constructor () {
    this.listeners = {}
  }

  on (event: string, callback: function): object {
    if (this.listeners[event] == null) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off (event: string, callback: function): void {
    if (this.listeners[event] == null) {
      throw new Error(`Нет события: ${event}`)
    }
    this.listeners[event] = this.listeners[event].filter((listener) => (listener !== callback))
  }

  emit (event: string, ...args): void {
    if (this.listeners[event] == null) {
      throw new Error(`Нет события: ${event}`)
    }
    this.listeners[event].forEach(function (listener) {
      listener(...args)
    })
  }
}
