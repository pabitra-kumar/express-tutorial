const userDB = {
    users: require("../data/users.json"),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "message": "username and password are required" })
    // check for duplicate username in the DB
    const duplicate = userDB.users.find(prsn => prsn.username === user);
    if (duplicate) return res.sendStatus(309) // Conflict
    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)
        // Store the new User
        const newUser = {
            "username": user,
            "roles": { "User": 2001 },
            "password": hashedPwd
        }
        userDB.setUsers([...userDB.users, newUser])
        console.log(userDB.users)
        await fsPromises.writeFile(
            path.join(__dirname, "..", "data", "users.json"),
            JSON.stringify(userDB.users)
        )
        console.log(userDB.users)
        res.status(201).json({ "success": `new user ${user} is created` })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = { handleNewUser }