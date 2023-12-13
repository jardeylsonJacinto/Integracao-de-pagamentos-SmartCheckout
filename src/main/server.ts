import { SetupApp } from '../main/config/app'
const port = 3001

async function start() {
  const app = await SetupApp()
  app.listen(port, () => {
    console.log(`listening on ${port}`)
  })
}

start()
