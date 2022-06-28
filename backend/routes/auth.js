const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET="harisisagoodboy$";
const fetchUser=require("../middleware/fetchUser");
// Crteate a User using :POST "/api/auth" Does not require authemtication
const router = express.Router();
router.post(
  '/createuser',
  [
    body("name","enter a valid name").isLength({ min: 3 }),
    body("email","enter a valid email").isEmail(),
    body("password","password must be atleat 5 characters").isLength({ min: 5 }),
  ],
   async (req, res) => {
    // if there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // //check whether user with this email already exists
    try {
      
      let user=await User.findOne({email:req.body.email});
      if(user){
        return res.status(400).json({error:"sorry user with email exists already"})
      }
      const salt= await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password ,salt);
      user= await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass
      })
      const data={
        user:{
          id:user.id
        }
      }
      var authToken=jwt.sign({authToken},JWT_SECRET);
      res.json({authToken})
      // res.json(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("some error occured")
    }
  }
);
// Authenticate a User using :POST "/api/auth/login" Does not require login
router.post(
  '/login',
  [
    // body("name","enter a valid name").isLength({ min: 3 }),
    body("email","enter a valid email").isEmail(),
    body("password","password can not be blank").exists(),
  ], async (req, res) => {
    // if there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
      let user= await User.findOne({email});
      if (!user){
        return res.status(400).json( {error:"please try to login with correct ceredentials"});
      }
      const PasswrodCompare=  await bcrypt.compare(password,user.password);
      if (!PasswrodCompare){
        return res.status(400).json( {error:"please try to login with correct ceredentials"});
      }
      const data={
        user:{
          id:user.id
        }
      }
      var authToken=jwt.sign({authToken},JWT_SECRET);
      res.json({authToken})
    } catch (error) {
      console.error(error.message)
      res.status(500).send("some error occured")
    }


    
// get user details using :POST "/api/auth/getuser" require login
    router.post(
      '/getuser', fetchUser,
      async(req,res)=>{
        try {
          userId=req.user.id;
          const user=await User.findById(userId).select("-password"); //take everything except password
          res.send(user)
        } catch (error) {
          console.error(error.message)
          res.status(500).send("some error occured")
        }

      }
    )
  })
module.exports = router;
