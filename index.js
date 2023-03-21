import router from './routes/router.js'
import express from 'express'
import connectMongoDb from './db/connect.js'
import cookieParser from 'cookie-parser'
const port = 4000
const app = express()
app.use(express.json())
app.use(cookieParser({
     httpOnly: true,
       secure: true,
}))
connectMongoDb()
app.use( router)

app.listen(port,()=>{
    console.log(`appListening at    http://localhost:${port}`)
})
