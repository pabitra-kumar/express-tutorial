const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;

// Custom- Middleware logger
app.use(logger)

// CORS origin resource sharing
const whitelist = ["https://www.google.com", "https://127.0.0.1:5500","https://localhost:3500"]
const corsOptions = {
    origin: (origin , callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null , true)
        }
        else{
            callback(new Error("Not Allowed By CORS"))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Bult-in Middle Ware to handle urlencoded data
// in other words, form data;
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}))

// Bult-in MiddleWare for JSON
app.use(express.json())

// serve static files
app.use('/' , express.static(path.join(__dirname , "public")))
app.use('/subdir' , express.static(path.join(__dirname , "public")))


app.use('/subdir' , require('./routes/subdir'))
app.use('/' , require('./routes/root'))
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