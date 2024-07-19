const router = require("express").Router();
const School = require("../models/School");
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs');

// create a new school with images
router.post("/", async (req, res) => {
    if (req.session.user) {
        const newSchool = {};
        if (!req.files) {
            return res.status(400).json({ message: 'Please upload an image' });
        } else {
            if (req.files.thumbnail) {
                const file = req.files.thumbnail;
                if (file.size > 2000000) {
                    return res.status(400).json({ message: 'Image size should not exceed 2MB' });
                }
                let fileName = file.name;
                let splitedName = fileName.split('.');
                let newFileName = splitedName[0] + uuid() + '.' + splitedName[splitedName.length - 1];
                file.mv(path.join(__dirname, '../uploads', newFileName), async (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'The file was not uploaded!' });
                    }
        
                });
                newSchool.thumbnail = newFileName;
            }
        }
        if (!req.body.name || !req.body.address || !req.body.location || !req.body.phoneNumber || !req.body.description) {
            return res.status(400).json({ message: 'Fill the required fields' });
        }

        const userId = req.session.user._id;
        const { name, address, location, phoneNumber, description, category } = req.body;
        newSchool.name = name;
        newSchool.address = address;
        newSchool.location = location;
        newSchool.phoneNumber = phoneNumber;
        newSchool.description = description;
        newSchool.category = category || "Uncategorized";
        newSchool.owner = userId;

        await new School(newSchool).save();
        res.status(200).json({ message: 'School created successfully!' });
            
    } else {
        res.status(403).json({ message: 'You are not logged in!' });
    }
});


// get all schools
router.get("/", async (req, res) => {
    try {
        const schools = await School.find();
        return res.status(200).json(schools);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


// get a school by ID
router.get("/:id", async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        return res.status(200).json({
            id: school._id,
            name: school.name,
            location: school.location,
            address: school.address,
            phoneNumber: school.phoneNumber,
            description: school.description,
            category: school.category,
            thumbnail: school.thumbnail,
            owner: school.owner,
            createdAt: school.createdAt    
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// update a school by ID
router.put("/:id",  async (req, res) => {
    if (req.session.user) {
        try {
            const school = await School.findById(req.params.id);
            if (school.owner == req.session.user._id || req.session.user.isAdmin) {
                const updatedSchool = {};
                // check if the user wants to update the image
                if (req.files) {
                    if (req.files.thumbnail) {
                        // delete the old image
                        if (school.thumbnail) {
                            fs.unlink(path.join(__dirname, '../uploads', school.thumbnail) , (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                        const file = req.files.thumbnail;
                        if (file.size > 2000000) {
                            return res.status(400).json({ message: 'Image size should not exceed 2MB' });
                        }
                        let fileName = file.name;
                        let splitedName = fileName.split('.');
                        let newFileName = splitedName[0] + uuid() + '.' + splitedName[splitedName.length - 1];
                        file.mv(path.join(__dirname, '../uploads', newFileName), async (err) => {
                            if (err) {
                                return res.status(500).json({ message: 'The file was not uploaded!' });
                            }
                        });
                        updatedSchool.thumbnail = newFileName;
                    }
                }
                if (req.body) {
                    try {
                        const { name, address, location, phoneNumber, description, category } = req.body;
                        updatedSchool.name = name || school.name;
                        updatedSchool.address = address || school.address;
                        updatedSchool.location = location || school.location;
                        updatedSchool.phoneNumber = phoneNumber || school.phoneNumber;
                        updatedSchool.description = description || school.description;
                        updatedSchool.category = category || school.category;
                    } catch (error) {
                        console.log(error);
                    }
                }
                await School.findByIdAndUpdate(req.params.id, updatedSchool, { new: true });
                res.status(200).json({ message: 'School updated successfully!' });
                
            } else {
                res.status(403).json({ message: 'You are not authorized to update this school!' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    
    }
});


// delete a school by ID
router.delete("/:id", async (req, res) => {
    if (req.session.user) {
        try {
            const school = await School.findById(req.params.id);
            if (school.owner == req.session.user._id || req.session.user.isAdmin) {
                const oldImages = school.images;
                if (oldImages && oldImages.length > 0) {
                    oldImages.forEach(image => {
                        fs.unlinkSync(path.join(__dirname, '..', 'SchoolImages', userId, image.filename));
                    });
                }
                await School.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'School deleted successfully!' });
            } else {
                res.status(403).json({ message: 'You are not authorized to delete this school!' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(403).json({ message: 'You are not logged in!' });
    }
});


// get Schools by category
router.get("/categories/:category", async (req, res) => {
    try {
        const schools = await School.find({ category: req.params.category });
        return res.status(200).json(schools);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// get schools by owners
router.get("/users/:owner", async (req, res) => {
    try {
        const schools = await School.find({ owner: req.params.owner });
        return res.status(200).json(schools);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;