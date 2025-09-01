const express = require('express');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../model/user');

const router=express.Router();

router.post('/register' ,async (req, res) => {
    try {

        const {username, password} =req.body;

        let user=await User.findOne({username});
        if (user) {
            return res.status(400).json({msg: 'User Already Exists'});
        }

        let salt=await bcrypt.genSalt(10);
        let hash=await bcrypt.hash(password,salt);

        user= new User({
            username,
            password: hash
        });

        await user.save();
        res.status(201).json({msg :'User Register SuccessFully'});

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login' , async (req , res) => {
    try {
        const {username,password} = req.body;

        const user=await User.findOne({username});
        if (!user) {
            return res.status(400).json({msg : 'user Not Found'});
        }

        const Match = await bcrypt.compare(password,user.password);
        if (!Match) {
            return res.status(400).json({msg : 'Invalid Crediantial'});
        }

        const payload={
            user: {
                id : user.id,
                username: user.username
            }
        };

        jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { username: user.username } });
      }
    );

    } catch{
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

module.exports = router;