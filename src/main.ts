import StreamDeck = require('elgato-stream-deck');
const myStreamDeck = new StreamDeck(); // Will throw an error if no Stream Decks are connected.

myStreamDeck.on('down', (keyIndex: number) => {
	console.log('key %d down', keyIndex);
});

myStreamDeck.on('up', (keyIndex: number) => {
	console.log('key %d up', keyIndex);
});

// Fired whenever an error is detected by the `node-hid` library.
// Always add a listener for this event! If you don't, errors will be silently dropped.
myStreamDeck.on('error', (error: string) => {
	console.error(error);
});