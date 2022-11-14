import express, { Request, Response } from 'express'

export const router = express.Router()

export const geee = 'gee'

/* GET home page */
router.get('/backend', (req: Request, res: Response) => {
  console.log(res.statusCode)
  console.log(req.body)
  res.json({
    hello: 'world',
    eyy: 'lala'
  })
})

export default { indexRouter: router }
