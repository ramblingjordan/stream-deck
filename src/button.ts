interface Icon {
  text?: string,
  bgcolor?: string,
  color?: string,
  path?: string
}

interface System {
  name: string
}

interface Action {
  (system: System, command: string): boolean
}

interface State {
  icon: Icon,
  onEnter?: Action,
  onExit?: Action
}

let blankIcon: Icon = {
  text: '',
  bgcolor: 'BLACK',
  color: 'WHITE'
}

let blankState: State = {
  icon: blankIcon
}

export class Button {
  deckIndex: number
  state: State
  up: State
  down: State

  constructor (
    deckIndex: number,
    state?: State) {
    this.deckIndex = deckIndex
    if (state) {
      this.state = state
    } else {
      this.state = blankState
    }
    this.up = this.state
    this.down = blankState
  }

  async push (): Promise<void> {
    console.log(this.deckIndex + ' down')
    this.state = this.down
  }

  async release (): Promise<void> {
    console.log(this.deckIndex + ' up')
    this.state = this.up
  }
}
