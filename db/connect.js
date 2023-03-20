import mongoose from "mongoose"

const mogoDbUri = "mongodb+srv://mihir72999:Mihir72999@api.tv0cw9w.mongodb.net/api?retryWrites=true&w=majority"

const connectMongoDb = () =>{
    mongoose.connect(mogoDbUri,{
        useNewUrlParser : true,
        useUnifiedTopology:true,
        
    }).then(()=>{

        console.log('connected successfuly')

})}
export default connectMongoDb  