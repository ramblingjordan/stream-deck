import * as path from 'path'

interface Icon {
  text: string,
  bgcolor?: string,
  color: string,
}

interface Helper {

}

interface Command {

}

interface Action {
  helper: Helper,
  command: Command
}

interface State {
  icon: Icon,
  onEnter?: Action,
  onExit?: Action
}

let iconUp: Icon = {
  text: "TEST",
  bgcolor: "BLACK",
  color: "WHITE"
}

let iconDown: Icon = {
  text: "test",
  bgcolor: "WHITE",
  color: "BLACK"
}

let stateUp: State = {
  icon: iconUp
}

let stateDown: State = {
  icon: iconDown
}

class Button {
  deckIndex: number
  state: State
  up: State
  down: State

  constructor(deckIndex: number) {
    this.deckIndex = deckIndex
    this.state = stateUp
    this.up = stateUp
    this.down = stateDown
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
