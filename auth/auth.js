import  jwt  from "jsonwebtoken";
import register from '../schema/register.js'
const authantication = async(req,res,next) =>{
    try {
        const tokens = req.cookies.jwtToken;
        const verifyToken = jwt.verify(tokens,"MIHIR")
        const getRootUser = await register.findOne({_id:verifyToken._id,"tokens.token":tokens})
      if(!getRootUser) {throw new Error('User Not found')} 
      req.tokens = tokens;
      req.rootUser = getRootUser;
      req.userId = getRootUser._id;      
     console.log(tokens)
      next()
    } catch (error) {
       console.log({error})
    }
}
export default authantication