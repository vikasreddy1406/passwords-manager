const express = require('express')
const router = express.Router();
const Passwords = require('../models/form');

// http://localhost:8000/api/passwords
router.get('/', async (req, res) => {
    try {
        const passwords = await Passwords.find();
        res.json(passwords);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// http://localhost:8000/api/passwords/add
router.post('/add', async (req, res) => {
    try {
        const { website, username, password, id } = req.body;
        const newPassword = new Passwords({ website, username, password, id });
        const newData = await newPassword.save();
        res.json(newData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!!!!!");
    }
})

// http://localhost:8000/api/passwords/update
router.put('/update', async (req, res) => {
    try {
        const { website, username, password, id } = req.body;
        await Passwords.findOneAndUpdate({ "id": id }, { $set: { "website": website, "username": username, "password": password } })
        res.send("Password updated successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!!!!!");
    }
})

// http://localhost:8000/api/passwords/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        // const { id } = req.body;
        await Passwords.findOneAndDelete({ "id": req.params.id })
        res.send("Password deleted successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!!!!!");
    }
})

module.exports = router