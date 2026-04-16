import express from 'express'
import cors from 'cors'
import authRouter from "./routes/auth.js"
import profilesRouter from './routes/profiles.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter);
console.log("Auth router running")
//Please register your routes here by importing the router and utilizing app.use
// example:
// import postingsRouter from './routes/postings.js'
// app.use('/postings', postingsRouter)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

app.get('/api/health', (req, res) => {
  res.status(200).json({success: true})
})
app.use('/api/profiles', profilesRouter)

export default app
