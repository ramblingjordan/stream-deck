"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamDeck = require("elgato-stream-deck");
var myStreamDeck = new StreamDeck(); // Will throw an error if no Stream Decks are connected.
myStreamDeck.on('down', function (keyIndex) {
    console.log('key %d down', keyIndex);
});
myStreamDeck.on('up', function (keyIndex) {
    console.log('key %d up', keyIndex);
});
// Fired whenever an error is detected by the `node-hid` library.
// Always add a listener for this event! If you don't, errors will be silently dropped.
myStreamDeck.on('error', function (error) {
    console.error(error);
});
