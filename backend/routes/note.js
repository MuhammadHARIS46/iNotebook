const express = require("express");
const Note = require("../models/Note");
var fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
//Route-1 get all the notes using Get "/api/note/fetchallnotes" login required
router.get("/fetchallnote", fetchUser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Route-2 Add notes using Post "/api/note/addnote" login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  

);
// Route 3 Update an existing note using Put "/api/note/updatenote" login required
router.put(
  "/updatenote/:id" ,fetchUser,async (req,res)=>{
    const {title,description,tag}=req.body;
    // Create a new note object
    const newNote={};
    if (title){newNote.title=title};
    if (description){newNote.description=description};
    if (tag){newNote.tag=tag};
    // Find note to be updated and update it
    let note= await Note.findById(req.params.id);
    if (!note){return res.status(404).send("Not Found")};
    if (note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed")};

    note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note})
  }
)
module.exports = router;
