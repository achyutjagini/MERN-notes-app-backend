
//importing modules
//express is the framework that handles routing, middleware, and
//other server-side functionality.

//body-parser is used to parse incoming request bodies and make them
//available as a JavaScript object.

//cors is a middleware for Express that allows for Cross-Origin Resource Sharing 
//(CORS). It allows the server to accept requests from a different origin than 
//the server itself.

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//db is supposed to be a module(folder) that connects to MongoDB database
//movieRouter is another module that contains the routing information for
//a "movies" resource.

const db = require('./db')
const NotesRouter = require('./routes/notes-router')

//The code creates an Express application by calling express() and 
//assigns it to the app variable. It then sets the port number to 3000
// and starts the server using the listen() method.

const app = express()
const apiPort = 3000

//app.use(bodyParser.urlencoded({ extended: true })) is setting up the middleware body-parser 
//to parse the body of incoming requests that have Content-Type of application/x-www-form-urlencoded.
// It allows to access the data sent in the request body via the req.body property.

//app.use(cors()) is a middleware that enables Cross-Origin Resource Sharing (CORS) in the application. 
//It allows the application to handle requests from different domains.
 
 //app.use(bodyParser.json()) is also middleware that parses the body of incoming requests
//that have Content-Type of application/json. It allows access the data sent in the request body via the req.body property.


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

//The code also connects to the MongoDB by db.on('error', console.error.bind(console, 
// 'MongoDB connection error:')) It listens to the 'error' event 
//  of the db connection and logs the error message to the console.

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


//Once the server starts, it will listen for incoming requests
// on the specified port. When a request is made to the root path
//  ('/'), the server will respond with "Hello World!" message.

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//This line of code is setting up a middleware that routes all requests 
//that start with the /api path to a movieRouter object.

//The app.use() function in Express.js is used to add middleware to the application,
// and it takes two arguments: a path and a function. In this case, the path is /api,
// which means that all requests that match this path will be handled by the middleware function.
// The function being passed as the second argument is movieRouter, which is an Express.js router object 
//that is used to define the routes for the API.

//It allows you to split up your server-side routing into smaller, more manageable units, and it's commonly used to organize routing for APIs.

app.use('/api', NotesRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))//()=>function has no arguments

