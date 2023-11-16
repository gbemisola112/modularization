 const userModel = require("../Models/user.model")
 const jwt = require("jsonwebtoken")
 const SECRET = process.env.SECRET


 const userWelcome =(req,res) =>{
    res.send(`<h1>Hello World !</h1>`)
    
    console.log("Hello");
}

const userWelcomes =(req,res)=>{
    res.send(`<h1>Hello !</h1>`)
    
    console.log("Hello");
}
const userSignup =(req,res)=>{
    // res.send(`<h1>User Signup</h1>`)
    // // console.log("signup");
    console.log(req.body);
    let user = new userModel (req.body)
   user.save().then(()=>{
    console.log("user saved");
    res.send({status:true, message:"User created successfully"})
    // res.redirect("signin")
   }).catch((err) =>{
    console.log("Error oe creating user", err);
    res.send({status:false, message:"Error creating user"})
    
   })
}
// const userDashboard =(req,res)=>{
//     res.send(`<h1>Welcome to your dashboard</h1>`)
//     console.log("dashboard");
// }
const authenticateUser =(req,res)=>{
    let {email,password} = req.body
    console.log(req.body);
    console.log('login back end');
    userModel.findOne({email:email}).
    then( async (user) =>{
        console.log(user);
        try{
            let getUser = await user.compareUser(password)
            if(getUser){
                let token = jwt.sign({email}, SECRET,{expiresIn: "1h"})
                res.send({status:false, message:"Login Successful", userdetails:user, token:token})
                console.log('User Found');
                console.log(user.lastName);3
            } else{
                console.log(user);
                console.log('User not found');
                res.send({status:true, message:"Incorrect Password"})
            }
        } catch{
            // console.log(err);
        }
    })
    .catch((err)=>{
        console.log("user not found", err);
    })
}

const userDashboard = (req,res)=>{
    console.log(req.headers);
    let token  = req.headers.authorization.split(" ")[1];
   jwt.verify(token, SECRET, ((err,result)=>{
       if(err){
           res.send({status:false, message:"Invalid Token"
   })
}else{
    console.log(result);
    res.send({status:true, message:"Login Successful", result})
}
   }))
}



module.exports = {userWelcome, userSignup,userDashboard,authenticateUser}
