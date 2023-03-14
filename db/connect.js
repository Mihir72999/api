import mongoose from "mongoose"
const mogoDbUri = 'mongodb://127.0.0.1:27017/data'

const connectMongoDb = () =>{
    mongoose.connect(mogoDbUri,{
        useNewUrlParser : true,
        useUnifiedTopology:true,
        
    }).then(()=>{

        console.log('connected successfuly')

})}
export default connectMongoDb