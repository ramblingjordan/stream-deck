import * as OBSWebSocket from 'obs-websocket-js'
import { Button } from './button'
import { DeckHandler } from './deckHandler'
import * as Helpers from './helpers'

async function main() {
  const sd = new DeckHandler()
  const obs = new OBSWebSocket()
  
  console.debug('Starting Up!')

  console.debug('Clearing all keys')
  await sd.clearAll()

  console.log('Maximizing brightness')
  await sd.setBrightness(100)

  console.log('Loading button file')
  let buttons: Button[] = await Helpers.loadButtons('../config/buttons.json')

  console.log('Creating button images')
  await sd.setAllButtons(buttons)

  console.log('Connecting to OBS websocket')
  await obs.connect({ address: 'localhost:4444' })
  
  console.log('Listening to event handlers...')
  sd.eventHandlers(buttons)
}

main()