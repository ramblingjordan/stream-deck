import { Button } from './button'

function getButton (id: number, buttons: Button[]) {
  let returnButton = new Button(0)
  buttons.forEach(button => {
    if (button.deckIndex === id) {
      returnButton = button
    }
  })
  return returnButton
}

function loadButtons (buttonFileIn: string) {
  const buttonFile = require(buttonFileIn)
  let buttons: Array<Button> = []

  for (let button of buttonFile) {
    buttons.push(new Button(button.keyID))
  }
  return buttons
}

async function createIcon (button: Button, iconSize: number) {
  let Jimp = require('jimp')
  let image = new Jimp(iconSize, iconSize, button.state.icon.bgcolor, (err: string) => { if (err) throw err })
  let font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)

  image.print(
    font,
    // size start
    0, 0,
    {
      text: button.state.icon.text,
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
