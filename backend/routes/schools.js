const router = require("express").Router();
const School = require("../models/School");
const multer = require('multer');
const path = require('path');


// Configure multer for keeping files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'schools/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const school = multer({ storage: storage });

// get all schools
router.get("/", async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json({ message: "Here are all the schools", [schools]});
    } catch (error) {
        res.status(500).json(error);
    }
});

// get a school
router.get("/:id", async (req, res) => {
    try {
        // verification of the Id
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const school = await School.findById(req.params.id);

        if (!school) {
            return res.status(404).json({ message: "No school found" });
        }

        res.status(200).json({ message: "Her the School", school: school });
    } catch (error) {
        res.status(500).json({ message: "Internal server Error", error: error });
    }
});


// delete a school
router.delete("/:id", async (req, res) => {
    if (req.session.user) {
        school = await School.findById(req.params.id);
        if (school) {
            if (req.session.user.isAdmin || req.session.user._id === school.owner) {
                const school = await School.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: "School has been deleted!", school: school });
            } else {
                res.status(401).json({ message: "You can delete only your school!" });
            }
        } else {
            res.status(404).json({ message: "School not found!" });
        }
    } else {
        res.status(401).json({ message: "You are not logged in!" });
    }
});


// update a school
router.put("/:id", async (req, res) => {
    if (req.session.user) {
        school = await School.findById(req.params.id);
        if (school) {
            if (req.session.user._id === school.owner) {
                const updatedSchool = await School.findByIdAndUpdate(req.params.id, { $set: req.body });
                res.status(200).json({ message: "School has been updated!", school: updatedSchool });
            } else {
                res.status(401).json({ message: "You can update only your school!" });
            }
        } else {
            res.status(404).json({ message: "School not found!" });
        }
    } else {
        res.status(401).json({ message: "You are not logged in!" });
    }
});

// create a school
