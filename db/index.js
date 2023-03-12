//This code is setting up a connection to a MongoDB database
// using the Mongoose library.

//const mongoose = require('mongoose') is requiring the Mongoose library, which is
// a popular Object-Document-Mapping (ODM) library for MongoDB and Node.js.

//mongoose.connect('mongodb://127.0.0.1:27017/cinema', { useNewUrlParser: true },{ useUnifiedTopology: true }) is
// establishing a connection to a MongoDB database running on the local machine (127.0.0.1) at port 27017 
//and connects to the database named cinema. It also set the option useNewUrlParser to true 
//and useUnifiedTopology to true for better compatibility.

//catch(e => {console.error('Connection error', e.message)}) is handling any connection errors. 
//If any error occurs during the connection process it logs the error message.

//const db = mongoose.connection is getting the connection object, which you can use to
// interact with the database.

//module.exports = db is exporting the connection object,
//so it can be used in other parts of the application.

const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/notes', { useNewUrlParser: true },{ useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
