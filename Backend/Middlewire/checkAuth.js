const  Token = require("../Service/token");

const checkAuth = async (req,res,next) =>{
    // taking token from headers
    const {authorization} =req.headers;
    // checking token should not empty and starts with Bearer
    if(authorization && authorization.startsWith('Bearer')){
        try{
            //splitting token
            const token = authorization.split(' ')[1];
            //verify token is valid or not
            Token.verifyToken(token);
            //moving to next step
            next();
        } catch{
            //sending response if unauthorized
            return res.status(401).json({message:'unauthorized user',token:false});
        }
    }
    // sending response if token is empty
    else return res.status(401).json({message:'token is required',token:false});
};

module.exports = checkAuth;