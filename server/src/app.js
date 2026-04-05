import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

//Please register your routes here
// example:
// import postingsRouter from './routes/postings.js'
// app.use('/postings', postingsRouter)

app.listen(5173, () => {
  console.log('Server running on port 5173')
})

export default app