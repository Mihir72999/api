import mongoose from "mongoose";



const registerSchema = new mongoose.Schema({
  name:{type:String,
         required:true    },
  
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(email) {  
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address'
      }
    },

  message:{
    type:String,
   minLength:[10, 'minimum 10letters'],
  

 }


})

export default mongoose.model('register',registerSchema)