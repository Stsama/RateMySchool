const router = require("express").Router();
const Contact = require("../models/Contact");

// create a contact
router.post("/", async (req, res) => {
  if (req.body.name && req.body.email && req.body.message) {
    try {
      const newContact = await new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
      const savedContact = await newContact.save();
      res.status(200).json({ message: "Contact has been saved!", contact: savedContact });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {  
    res.status(400).json({ message: "Please fill all the fields!" });
  }
});

// get all contacts
router.get("/", async (req, res) => {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      try {
        const contacts = await Contact.find();
        res.status(200).json({ message: "Contacts fetched successfully!", contacts: contacts });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(401).json({ message: "You are not authorized to view contacts!" });
    }
  } else {
    res.status(401).json({ message: "You are not authorized to view contacts!" });
  }
});


// get a contact by ID
router.get("/:id", async (req, res) => {
  if (req.session.user && req.session.user.isAdmin) {
    if (req.params.id) {
      try {
        const contact = await Contact.findById(req.params.id);
        res.status(200).json({ message: "Contact fetched successfully!", contact: contact });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(400).json({ message: "Please provide the contact ID!" });
    }
  } else {
    res.status(401).json({ message: "You are not authorized to view this contact!" });
  }
});

// delete a contact by ID
router.delete("/:id", async (req, res) => {
  if (req.session.user && req.session.user.isAdmin) {
    if (req.params.id) {
      try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Contact has been deleted!" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  } else {
    res.status(401).json({ message: "You are not authorized to delete this contact!" });
  }
});

module.exports = router;