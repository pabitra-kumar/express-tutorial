const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) {this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const authUser = async (req, res) => {
    const {user , pwd} = req.body
    if(!user || !pwd) return res.status(400).json({"message" : "username and password are required"})
    const foundUser = userDB.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401) // unAuthorised
    // Match the password
    const match = await bcrypt.compare(pwd , foundUser.password)
    if(match){
        res.status(200).json({"success" : `user ${user} is Successfully logged in!`})
    } else {
        res.sendStatus(401) // unauthorized
    }
}

module.exports = {authUser}