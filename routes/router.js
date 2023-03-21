import express from 'express'
import jwt from 'jsonwebtoken'
import authantication from '../auth/auth.js'
import path from 'path'
import Registers from '../schema/register.js'
import Users from '../schema/schema.js'
const router = express.Router()

router.get('/api', async (req, res) => {
    try {
        const user = new Users({
            name: "DHAVAL PATEL",
            surname: "MORLIYA",
            age: 37,
            occupation: "CLOUD NETWORKING",
        })


        const data = await Users.insertMany(user)

        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }


})
router.get('/', (req, res) => {
    res.sendFile(path.join( 'index.html'))
  

})
router.post('/register', async (req, res, next) => {
    const { name, email, number } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userExist = await Registers.findOne({ email })


    if (!name || !email || !number) {
        return res.status(422).send('invalid registration user has to blank field email or name')
    }

    try {
        if (!emailRegex.test(email)) {

            res.status(422).send('you have to fill correct email')
        }


        else if (number.length !== 10) {
            res.status(422).send('this is invalid number')
        }
        else if (userExist) {

            res.status(422).send('user already exists')
        }
        else {



            const register = new Registers({
                name,
                email,
             
                number
            })
            const token = await register.generateAuthToken()
            console.log(token)

            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 3000000)
               
                
            })
             
            console.log(register)
           await register.save()
           res.send('data send successfuly')
        }
    } catch (error) {
        res.status(422).send('Invalid Registration')
    }
    next()

})


router.post('/login',authantication, async (req, res) => {
 try{
    const { message } = req.body
    const findUser = await Registers.findOne({_id : req.userId})
    
  if(findUser){
           
            const getMessage = await findUser.isMessageAuth(message)
           
            console.log(getMessage)
         res.status(200).json({"save":"successfuly"}) 
        }
      
 }catch(error){
    console.log(error)
 }
      
   
})

router.get('/router',(req,res)=>{
    res.status(200).send('welcome to route')
})

router.get('/getUserData', authantication, async (req, res) => {
    console.log(req.rootUser)

    const data = req.rootUser

    res.send({ data: [data] })
})

export default router   
