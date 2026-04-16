import express from 'express'
import cors from 'cors'
import profilesRouter from './routes/profiles.js'

const app = express()

app.use(cors())
app.use(express.json())

//Please register your routes here by importing the router and utilizing app.use
// example:
// import postingsRouter from './routes/postings.js'
// app.use('/postings', postingsRouter)

app.listen(5173, () => {
  console.log('Server running on port 5173')
})
app.use('/api/profiles', profilesRouter)

export default app
