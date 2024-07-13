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
        const { name, address, location, phoneNumber, description } = req.body;
        newSchool.name = name;
        newSchool.address = address;
        newSchool.location = location;
        newSchool.phoneNumber = phoneNumber;
        newSchool.description = description;
        newSchool.owner = userId;

        await new School(newSchool).save();
        res.status(200).json({ message: 'School created successfully!' });
        

        // try {
        //     let { name, address, location, phoneNumber, description, successRate, reviews, likes, dislikes, trainings} = req.body;
        //     if (!name || !address || !location || !phoneNumber || !description) {
        //         return res.status(400).json({ message: 'Fill the required fields' });
        //     }
        //     let thumbnail = req.files[0];
        //     const userId = req.session.user._id;
        //     if (thumbnail.size > 2000000) {
        //         return res.status(400).json({ message: 'Image size should not exceed 2MB' });
        //     }
        //     let fileName = thumbnail.name;
        //     let splitedName = fileName.split('.');
        //     let newFileName = splitedName[0] + UUID() + '.' + splitedName[splitedName.length - 1];
        //     thumbnail.mv(path.join(__dirname, '..', 'SchoolImages', newFileName), async (error) => {
        //         if (error) {
        //             return res.status(400).json({ message: error.message });
        //         } else {
        //             const newSchool = new School({
        //                 name,
        //                 address,
        //                 location,
        //                 phoneNumber,
        //                 description,
        //                 successRate,
        //                 reviews,
        //                 likes,
        //                 dislikes,
        //                 trainings,
        //                 thumbnail: newFileName,
        //                 owner: userId
        //             });
        //             await newSchool.save();
        //             if (!newSchool) {
        //                 return res.status(400).json({ message: 'Error creating school' });
        //             }
        //             res.status(200).json({ message: 'School created successfully!', newSchool });
        //         }    
        //     });
        // } catch (error) {
        //     res.status(400).json({ message: error.message });
        // }
            
    } else {
        res.status(403).json({ message: 'You are not logged in!' });
    }
});

// get all schools

router.get("/", async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json({message: 'Schools fetched successfully!', schools});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// get a school by ID
router.get("/:id", async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        res.status(200).json({ message: 'School fetched successfully!', school });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update a school by ID
router.put("/:id", school.array('images', 5),  async (req, res) => {
    if (req.session.user) {
        try {
            const school = await School.findById(req.params.id);
            if (school.owner == req.session.user._id) {
                if (req.body.name && req.body.address && req.body.location && req.body.phoneNumber && req.body.description) {
                    newSchoolData = JSON.parse(JSON.stringify(req.body));
                    if (req.files.length > 0) {
                        const fileUrls = req.files.map(file => ({
                            filename: file.filename,
                            url: `${req.protocol}://${req.get('host')}/SchoolImages/${userId}/${file.filename}`
                        }));
                        newSchoolData.images = fileUrls;
                        const oldImages = school.images;
                        if (oldImages && oldImages.length > 0) {
                            oldImages.forEach(image => {
                                fs.unlinkSync(path.join(__dirname, '..', 'SchoolImages', userId, image.filename));
                            });
                        }
                    }
                    await School.findByIdAndUpdate(req.params.id, newSchoolData, {new: true});
                    res.status(200).json({ message: 'School updated successfully!' });
                }
            } else {
                res.status(403).json({ message: 'You are not authorized to update this school!' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(403).json({ message: 'You are not logged in Yezt !!!' });
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


module.exports = router;