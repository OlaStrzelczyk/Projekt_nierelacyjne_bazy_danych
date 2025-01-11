const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    try {
        jwt.verify(token, process.env.JWTkey)
    next()
    }
    catch(err) {
        return res.status(401).json({wiadomość: "Błąd autoryzacji"})
    }
}

console.log('JWT Key:', process.env.JWTkey);