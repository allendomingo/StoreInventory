import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// routers
import indexRouter from './routes/index'

dotenv.config()

const app = express()
const port = process.env.PORT
const mongoURL = process.env.MONGO_URL as string

const connect = mongoose.connect(mongoURL)
console.log(`Connecting to ${process.env.NODE_ENV} enviroment`)
connect.then(
  () => {
    console.log('Connected correctly to server')
  },
  (err) => console.log(err)
)

app.use('/', indexRouter.indexRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Serve!!!r')
})

app.listen(port, () => {
  console.log(`[server]: Server is now running at https://localhost:${port}`)
})
