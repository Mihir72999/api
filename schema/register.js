import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";


const registerSchema = new mongoose.Schema({
  name:{type:String,
         required:true    },
  
    email: {
      type: String,
      required: true,
     
      validate: {
        validator: function(email) {  
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address'
      }
    },

  
   number:{
    type:Number,
    Length:[10 , '10numbers']

   },
   message:[{
   
     message:{ type:String,
       minLength:[10, 'minimum 10letters'] 
    }
     }
   ],
  
   tokens:[{
    token:{
      type:String
    }
   }]

})
registerSchema.methods.generateAuthToken = async function() {
try {
  let token = jwt.sign({_id:this._id},'MIHIR')
  this.tokens = this.tokens.concat({token})
 await this.save()
 return token 
} catch (error) {
  console.log(error)
}
}
registerSchema.methods.isMessageAuth = async function(message){
  try {
      this.message = this.message.concat({message})
    await this.save()
    return this.message
  } catch (error) {
     console.log(error)
  }
}

export default mongoose.model('register',registerSchema)
