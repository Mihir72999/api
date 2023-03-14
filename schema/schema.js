import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

name:{
    type:String,
   
},
surname:{
    type:String,
    
},
age:{
    type:Number
    
},
occupation:{  
      type:String,
    
}

})

export default mongoose.model("User",userSchema)