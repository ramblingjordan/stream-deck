import StreamDeck = require('elgato-stream-deck');
const sd = new StreamDeck(); // Will throw an error if no Stream Decks are connected.

function startup() {
  console.debug('Starting Up!')

  console.debug('Clearing all keys')
  sd.clearAllKeys()

  console.log('Maximizing brightness')
  sd.setBrightness(100)

  console.log('Setting all to green')
  for(let i=0; i<=14; i++){
    sd.fillColor(i, 0, 255, 0)
  }
}

sd.on('down', (keyIndex: number) => {
  console.log('key %d down', keyIndex)
  sd.fillColor(keyIndex, 255, 0, 0)
})

sd.on('up', (keyIndex: number) => {
  console.log('key %d up', keyIndex)
  sd.fillColor(keyIndex, 0, 255, 0)
})

sd.on('error', (error: string) => {
	console.error(error)
})

startup()