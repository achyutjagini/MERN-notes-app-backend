//This code defines a Mongoose schema for a movie and exports a model based on this schema.

//const mongoose = require('mongoose') is requiring the Mongoose library, which is a popular Object-Document-Mapping
// (ODM) library for MongoDB and Node.js.

//const Schema = mongoose.Schema is getting the Schema class from Mongoose, which is used to
// define the structure of documents in a MongoDB collection.

//const Movie = new Schema({...}, { timestamps: true }) is creating a new schema object for a movie,
// with properties for name, time, rating and setting the option timestamps to true. The timestamps
// adds createdAt and updatedAt fields to the schema.

//name is a required string, time is an array of strings and rating is a number and not required.

//module.exports = mongoose.model('movies', Movie) is creating a model for
// the movies collection in MongoDB, based on the Movie schema 
//defined above and exporting it,
// so it can be used in other parts of the application.

//It allows you to interact with the 'movies' collection in your MongoDB using the 
//methods provided by Mongoose, such as .find(), .findOne(), .create(), .update(), etc.


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = new Schema(
    {
        topic: { type: String, required: true },
        note: { type: String, required: true },
    },
    { timestamps: true },
)

//module.exports = mongoose.model('movies', Movie) is creating a model for
// the movies collection in MongoDB, based on the Movie schema 
//defined above and exporting it,
// so it can be used in other parts of the application.
//Movie - new schema
module.exports = mongoose.model('notes',Note)