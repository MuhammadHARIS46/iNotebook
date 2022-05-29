const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
// Crteate a User using :POST "/api/auth" Does not require authemtication
const router = express.Router();
router.post(
  "/",
  [
    body("name","enter a valid name").isLength({ min: 3 }),
    body("email","enter a valid email").isEmail(),
    body("password","password must be atleat 5 characters").isLength({ min: 5 }),
  ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)
        res.json({error:"please enter a unique value",message:err.message})
    })
  }
);
module.exports = router;
