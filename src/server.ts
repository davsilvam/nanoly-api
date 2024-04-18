import { app } from './app'

app.listen({
  port: 3333,
  host: '0.0.0.0',
}).then(() => {
  // eslint-disable-next-line no-console
  console.log('HTTP server is running on port 3333! ✨')
})
