let instances: Framebus[] = []

class Framebus {
  events: any
  origin: string
  channel: string

  constructor({ origin, channel }: { origin?: string; channel?: string } = {}) {
    this.origin = origin
    this.channel = channel
    this.events = {}
    instances.push(this)
  }

  on(eventName: string, callback: (data: any) => void) {
    this.events[eventName] ??= []
    this.events[eventName].push(callback)
  }

  emit(eventName: string, data: any) {
    const events = this.events[eventName] ?? []
    events.forEach((event) => event(data))
  }

  static target({ origin, channel }: { origin: string; channel: string }) {
    return new Framebus({ origin, channel })
  }

  static getInstances(): Framebus[] {
    return instances
  }

  static clearInstances(): void {
    instances = []
  }
}

module.exports = Framebus
