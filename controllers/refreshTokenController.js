const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) {this.users = data}
}

const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401) // UnAuthorization
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser) return res.sendStatus(401) // unAuthorization
    // Evalute JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err , decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const accessToken = jwt.sign(
                {"username": foundUser.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            res.json({accessToken})
        }
    )
}

module.exports = {handleRefreshToken}