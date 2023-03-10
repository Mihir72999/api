import router from './routes/router.js'
import express from 'express'
import connectMongoDb from './db/connect.js'
const port = 4000
const app = express()
app.use(express.json())
connectMongoDb()
app.use( router)

app.listen(port,()=>{
    console.log(`appListening at    http://localhost:${port}`)
})