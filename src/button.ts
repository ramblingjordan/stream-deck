import * as path from 'path'

interface Icon {
  text: string,
  bgcolor?: string,
  color: string,
}

enum System {
  
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

class Button {
  deckIndex: number
  state: State
  up: State
  down: State

  constructor(
    deckIndex: number,
    state?: State) {
    this.deckIndex = deckIndex
    if (state) this.state = state
    else this.state = blankState
    this.up = blankState
    this.down = blankState
  }

  push(): void {
    console.log(this.deckIndex + ' down')
    this.state = this.down
  }

  release(): void {
    console.log(this.deckIndex + ' up')
    this.state = this.up
  }
}

export { Button }
