const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) {this.users = data}
}

const jwt = require('jsonwebtoken')

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
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            res.json({accessToken})
        }
    )
}

module.exports = {handleRefreshToken}