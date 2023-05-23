require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const PORT = process.env.PORT || 3500;

// Custom- Middleware logger
app.use(logger)

//handle Options credential check - befire CORS
// and fetch cookies credential requirements
app.use(credentials)

// CORS origin resource sharing
app.use(cors(corsOptions))

// Bult-in Middle Ware to handle urlencoded data
// in other words, form data;
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}))

// Bult-in MiddleWare for JSON
app.use(express.json())

// Middleware for Cookies
app.use(cookieParser())

// serve static files
app.use('/' , express.static(path.join(__dirname , "public")))
app.use('/subdir' , express.static(path.join(__dirname , "public")))


app.use('/subdir' , require('./routes/subdir'))
app.use('/' , require('./routes/root'))
app.use('/register' , require('./routes/register'))
app.use('/auth' , require('./routes/auth'))
app.use('/refresh' , require('./routes/refresh'))
app.use('/logout' , require('./routes/logout'))

app.use(verifyJWT)
app.use('/employees' , require('./routes/api/employees'))

app.all('*' , (req , res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname , "views" , "404.html"))
    } 
    else if (req.accepts('json')) {
        res.json({error: "404 not found"})
    } else {
        res.type('text').send("404 not found")
    }
})

app.use( errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

