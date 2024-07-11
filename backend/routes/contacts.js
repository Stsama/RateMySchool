const router = require("express").Router();
const Contact = require("../models/Contact");

// create a contact
router.post("/", async (req, res) => {
  if (req.body.name && req.body.email && req.body.message) {
    const newContact = await new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    const savedContact = await newContact.save();
    res.status(200).json({ message: "Contact has been saved!", contact: savedContact });
  } else {
    res.status(400).json({ message: "Please fill all the fields!" });
  }
});