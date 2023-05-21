const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) {this.users = data}
}

const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt

    // if refreshToken in DB ?
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser)
    {
        res.clearCookie('jwt', {httpOnly: true , maxAge: 24*60*60*1000})
        return res.sendStatus(204) // unAuthorization
    } 
    // Delete refreshToken in DB
    const otherUsers = userDB.users.filter(person => person.username !== foundUser.username )
    const currentuser = {
        ...foundUser,
        refreshToken: ''
    }
    userDB.setUsers([...otherUsers,currentuser])
    fsPromises.writeFile(
        path.join(__dirname , '..' , 'data' , 'users.json'),
        JSON.stringify(userDB.users)
    )
    res.clearCookie('jwt', {httpOnly: true , maxAge: 24*60*60*1000}) // secure: true - only serves on https
    res.sendStatus(204) // all is ok but no content to send
}

module.exports = {handleLogout}