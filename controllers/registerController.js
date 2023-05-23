const User = require('../data/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const {user , pwd} = req.body
    if(!user || !pwd) return res.status(400).json({"message" : "username and password are required"})
    // check for duplicate username in the DB
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate) return res.sendStatus(309) // Conflict
    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd , 10)
        // Create and Store the new User
        const result = await User.create( {
            "username": user ,
            "password": hashedPwd
        })
        console.log(result)
        res.status(201).json({"success": `new user ${user} is created`})
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

module.exports = {handleNewUser}