const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//import bcrypt
const bcrypt = require("bcrypt");

// importuję JBT
const jwt = require("jsonwebtoken");

//importuję model
const User = require("../models/user");

// zakładanie konta

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.status(500).json({wiadomość: err})
    
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
    }) 

    user.save()
    .then(() => res.status(200).json({wiadomość: "Dodano użytkownika."}))
    
    })
});

//logowanie
router.post("/login", (req, res, next) => {
    //najpierw sprawdzam czy jest taki email
    User
    .findOne({email: req.body.email})
    .then(user => {
        // jeśli jest to pobieram obiekt usera
        if(!user)
            return res.status(401).json({wiadomość: "Błąd autoryzacji."})

        // weryfikuje hasha
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err)
                return res.status(500).json({wiadomość: err})
            if(!result)
                return res.status(401).json({wiadomość: "Błąd autoryzacji."})
            // jak jest ok to zwracam JWT
            const token = jwt.sign(
                {user: user._id, email: user.email},
                process.env.JWTkey,
                {expiresIn: "1d"}
            )

            return res.status(200).json({token})
        });
    })
});


module.exports = router;