const mongoose = require("mongoose")
const bcrypt =  require("bcrypt")

let userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{type:String, unique: true, required:true},
    password: String
})

let saltRound = 10;

userSchema.pre("save", function(next){
    bcrypt.hash(this.password, saltRound, (err, hash) =>{
        if (err){
         console.log(`error:${err}`);
        }else{
             console.log(hash);
             this.password = hash;
             next();
        }
    })
})
userSchema.methods.compareUser = async function(password){
    try{
       let checkpasword =  await bcrypt.compare(password, this.password)
       
        if(checkpasword){
            return checkpasword
        }
        else{
            return false
        }
    }catch (err){
        console.log(err)
    }
}

// let user = new userModel({
//     firstName:"John",
//     lastName:"Doe",
//     email:"johndoe@email.net",
//     password:"123456"
// })

// user.save()



let userModel = mongoose.model("users", userSchema)

module.exports = userModel
