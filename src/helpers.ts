import { Button } from './button'

function getButton(id: number, buttons: Button[]) {
  let returnButton: Button
  buttons.forEach(button => {
    if (button.deckIndex == id) {
      returnButton = button
    }
  })
  return returnButton
}

function loadButtons(buttonFileIn: string) {
  const buttonFile = require(buttonFileIn)
  let buttons: Array<Button> = []

  for (let button of buttonFile) {
    buttons.push(
      new Button(
        button.name,
        button.keyID,
        button.title,
        button.toggles,
        button.initialStatus
      )
    )
  }
  return buttons
}

export { getButton, loadButtons }