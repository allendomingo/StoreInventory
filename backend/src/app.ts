import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

// routes
import indexRouter, { geee as geeesss } from './routes/index'

dotenv.config()

const app = express()
const port = process.env.PORT

console.log(geeesss)

app.use('/', indexRouter.indexRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Serve!!!r')
})

app.listen(port, () => {
  console.log(`[server]: Server is now running at https://localhost:${port}`)
})
