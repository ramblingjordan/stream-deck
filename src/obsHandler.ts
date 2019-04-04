function setScene(sceneName: string) {
  obs.send('SetCurrentScene', { 'scene-name': sceneName})
  .catch(err => {})
}