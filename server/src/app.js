import express from 'express'
import cors from 'cors'
import authRouter from "./routes/auth.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter);
//Please register your routes here by importing the router and utilizing app.use
// example:
// import postingsRouter from './routes/postings.js'
// app.use('/postings', postingsRouter)

app.listen(5173, () => {
  console.log('Server running on port 5173')
})

app.get('/api/health', (req, res) => {
  res.status(200).json({success: true})
})

export default app