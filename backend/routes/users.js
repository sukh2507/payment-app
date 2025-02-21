const express = require('express');
const zod = require("zod");
const { User, Account } = require('../db');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { authmiddleware } = require('../middleware');
const { JWT_SECRET } = require('../config');
const mongoose = require('mongoose');

const signupschema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    name: zod.string(),
    age: zod.number().int()
});

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupschema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            msg: "Invalid inputs"
        });
    }

    const existingUser = await User.findOne({
        email: body.email
    });

    if (existingUser) {
        return res.status(411).json({
            msg: "Email already taken"
        });
    }

    const dbUser = await User.create(body);
    const userId = dbUser._id;

    await Account.create({
        userId,
        name:dbUser.name,
        balance: 1 + Math.random() * 1000,
    });

    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.json({
        msg: "User created successfully",
        token: token
    });
});

const signinschema = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinschema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ msg: "Invalid inputs" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    if (user.password !== password) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ msg: "Signin successful", token });
});


const updatedbody = zod.object({
    password: zod.string().optional(),
    name: zod.string().optional(),
});

router.put("/", authmiddleware, async (req, res) => {
    const { success } = updatedbody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            msg: "Error while updating information"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        msg: "Updated successfully"
    });
});

router.get('/getusers', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        name: {
            "$regex": filter,
            "$options": "i"
        }
    });

    res.json({
        users: users.map(user => ({
            email: user.email,
            name: user.name,
            _id: user._id
        }))
    });
});

router.get('/bulk',authmiddleware,async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        name: {
            "$regex": filter,
            "$options": "i"
        }
    });

    res.json({
        users: users.map(user => ({
            email: user.email,
            name: user.name,
            _id: user._id
        }))
    });
})


module.exports = router;