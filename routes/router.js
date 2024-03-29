import express from 'express'
import jwt from 'jsonwebtoken'
import authantication from '../auth/auth.js'
import cors from 'cors'
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
    res.send('welcome to express')
  

})

router.post('/register', async (req, res) => {
    const { name, email, number } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  


    if (!name || !email || !number) {
        return res.status(422).json({message:"invalid registration user has to blank field email or name"})
    }

    try {
        if (!emailRegex.test(email)) {

            res.status(422).json({message:"you have to fill correct email"})
        }


        else if (number.length !== 10) {
            res.status(422).json({message:"this is invalid number"})
        }
    
        else {



            const register = new Registers({
                name,
                email,
                //    message,  
                number
            })
            const token = await register.generateAuthToken()
            console.log(token)

        const cook = res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 3000000),
                httpOnly: true,
                
                
            })
             
            console.log(register)
         const data =  await register.save()
            res.status(200).json(data.tokens)
        }
    } catch (error) {
        res.status(422).json({message:"Invalid Registration"})
    }
    

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

router.get('/getUserData',cors() ,authantication, async (req, res) => {
    console.log(req.rootUser)

    const data = await req.rootUser

    res.json({data:[data]})
})

export default router   
