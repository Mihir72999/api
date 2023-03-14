import express from 'express'

import Registers from '../schema/register.js'
import Users from '../schema/schema.js'
const router = express.Router()

router.get('/api',async(req,res)=>{
    try{
        const user = new Users({
            name:      "DHAVAL PATEL",
            surname:   "MORLIYA",
            age:       37,
            occupation:"CLOUD NETWORKING",
        })
       
       
        const data = await Users.insertMany(user)
        
         res.status(200).send(data)
    }catch(error){
        console.log(error)
    }
  

})
router.get('/',(req,res)=>{
    res.send("welcome to the express")
    
})
router.post('/register',async(req,res ,next )=>{
    const {name , email , message} = req.body
   
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!name || !email || !message){
            return res.status(422).send('invalid registration user has to blank field email or name')
        }
        try{
            const userExist = await Registers.findOne({email})
             if(!emailRegex.test(email)){
                
                res.status(422).send('you have to fill correct email')
            }
            
            else if(message.length < 10){
                res.status(422).send("you have to fill at lest minimum 15 charactor")
            }
            else if(userExist){
                res.status(422).send('user already exists')
            }
       else{
           const register = new Registers({
               name ,  
               email,  
               message
            })  
            console.log(register)
            register.save()
            res.status(200).send('data has been saved successfully')
        }
    }catch(error){
        res.status(422).send('Invalid Registration1')
    }
    next()  
    
 } )
    
 router.get('/register',async(req,res )=>{
      
          try {
      const getUserData = await Registers.find()
      if(!getUserData){
        res.status(401).send("have some bad request")
      }
      else{
          console.log(getUserData)
          res.status(200).send({getUserData})

      }
      
} catch (error) {

   res.status(422).send(error.message)
} 
    
 })
    
       
           
        
   



export default router