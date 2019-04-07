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

async function createIcon(button: Button, iconSize: number) {
  let Jimp = require('jimp')
  let image = new Jimp(iconSize, iconSize, 'black', (err: string) => {
    if (err) throw err
  })
  let font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)

  image.print(
    font,
    // size start
    0, 0,
    {
      text: button.title,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    },
    // total size
    iconSize, iconSize
  )
  // Jimp seems to prepend some bytes I can't remove, so SNIP!
  return (await image.getBufferAsync(Jimp.MIME_BMP)).slice(54)
  
}

export { getButton, loadButtons, createIcon }