const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
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
      user= await User.create({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
      })
      
      res.json(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("some error occured")
    }
  }
);
module.exports = router;
