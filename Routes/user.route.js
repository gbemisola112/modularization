const express = require("express")
const  router = express.Router()
const  {userWelcome,userSignup,userDashboard,authenticateUser} = require("../Controllers/user.controller")


router.get("/welcome", userWelcome)
router.post("/signup", userSignup)
router.get("/dashboard", userDashboard)
router.post("/login", authenticateUser)



module.exports = router