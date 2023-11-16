const express = require('express');
const app = express();
const env = require('dotenv').config();
const PORT= process.env.PORT
const URI= process.env.URI
const userRoute = require("./Routes/user.route")
const cors = require("cors")


const mongoose = require("mongoose")

mongoose.connect(URI)
.then(()=> {console.log("Database sucessfully ");
})
.catch((err) => {
    console.log(err);
})

  
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// app.use(express.urlencoded({extended: true}))
app.use("/user", userRoute)


app. listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`);
});