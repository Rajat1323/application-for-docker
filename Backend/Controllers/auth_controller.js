const User = require("../Models/user");
const  Token = require("../Service/token");


const login = (req,res) => {
   // console.log(req.body);
    
   // fetch data from db using userName or email
    User.findAll({
        where: {
            userName: req.body.email,
        },
      }).then(result=>{
        // if user id not found
        if(result.length==0){
           return res.status(404).json({message:'User Not Found'});
        }

        // verify password
        const userData=result.find(data =>data.password===req.body.password);

        // if password is matched
        if(userData!=null) { 
            const token = Token.createToken(userData);
            return res.status(201).json({
              fullName:userData.fullName,
              userName:userData.userName,
              role:userData.role,
              token:token
            });
        }
        // if password is not matched
        else return res.status(404).json({message:'Password Incorrect'});
        
      }).catch(error=>{
         return res.status(500).json({ 
            message:'Something went wrong',
            error:error
        });
      });
    //   return res.json('ok');
};

//register admin user
const register = (req, res) => {
  const new_user = {
    fullName: req.body.fullName,
    userName: req.body.userName,
    password: req.body.password,
    mobile: req.body.mobile,
    role: 'Admin',
  };
  User.create(new_user)
    .then((result) => {
      return res.status(201).json({
        message: "Admin Added Successfully",
        id: result.id,
      });
    })
    .catch((errors) => {
      return res.status(500).json({
        message: errors.errors[0].message
          ? errors.errors[0].message
          : "Something went wrong",
        errors: errors,
      });
    });
};

module.exports ={login,register};