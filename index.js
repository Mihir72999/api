import router from './routes/router.js'
import express from 'express'
import connectMongoDb from './db/connect.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const port = 4000
const app = express()
app.use(cors())
app.use(express.json())

app.use(cookieParser())
connectMongoDb()


app.use( router)

app.listen(port,()=>{
    console.log(`appListening at    http://localhost:${port}`)
})
