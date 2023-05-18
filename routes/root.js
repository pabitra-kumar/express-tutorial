const express = require('express')
const router = express.Router()
const path = require('path')

router.get("^/$|/index(.html)?" , (req , res) => {
    // res.sendFile('./views/index.html' , {root: __dirname})
    res.sendFile(path.join(__dirname , '..' , "views" , "index.html"))
})

router.get("/new-page(.html)?" , (req , res) => {
    res.sendFile(path.join(__dirname , '..' , "views" , "new-page.html"))
})

router.get("/old-page(.html)?" , (req , res) => {
    res.redirect(301 , 'new-page.html') // 302 by default
})

router.get("/hello(.html)?" , (req , res , next) => {
    console.log("Processing to serve DiffieHellmanGroup.html")
    next()
}, (req , res) => {
    res.send("<h1>Hello World!</h1>")
})

// Chain Function
const one = (req , res , next) => {
    console.log('one')
    next()
}

const two = (req , res , next) => {
    console.log('two')
    next()
}

const three = (req , res) => {
    console.log('three')
    res.send("<h1>Finished!</h1>")
}

router.get("/chain(.html)?" , [one , two , three])

module.exports = router