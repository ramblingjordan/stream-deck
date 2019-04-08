import * as path from 'path'

class Button {
  name: string
  deckIndex: number
  state: boolean
  title: string
  toggles: boolean
  path: string

  constructor (
    name: string,
    deckIndex: number,
    title: string,
    toggles: boolean,
    initialState: boolean
  ) {
    this.name = name
    this.deckIndex = deckIndex
    this.title = title
    this.toggles = toggles
    this.state = initialState
    this.path = path.resolve(__dirname, '..', 'icons', this.name + '.png')
  }

  push () {
    this.state = true
    console.log(this.name + ' down')
  }

  release () {
    this.state = false
    console.log(this.name + ' up')
  }
}

export { Button }
