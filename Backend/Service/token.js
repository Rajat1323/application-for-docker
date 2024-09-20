const jwt =require("jsonwebtoken");
const secret = "rajat$123@$#%&";

// generate token
const createToken = (user) =>{
    // create payload
     const payload = {
        _id:user.id,
        email:user.userName
     };
    return jwt.sign(payload,secret);
};

// verify token
const verifyToken =(token) =>{
    if(!token) return null;
    return jwt.verify(token,secret);
};

module.exports = {createToken, verifyToken};