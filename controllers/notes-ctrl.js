//This code defines several functions that handle different routes
// for a Note API. These functions 
//are typically used in conjunction with the router that you defined earlier, to handle
// incoming HTTP requests.

//const Note = require('../models/Note-model') is requiring the Note model, which provides an interface
// for interacting with the Notes collection in the MongoDB database.

//createNote function is taking two arguments request and response, checks if the body of the request 
//is present or not and creates a new instance of the Note model using the request body. Then it attempts
// to save the Note to the database and returns a JSON object to the client indicating success or failure.


//deleteNote function is taking two arguments request and response, finds and deletes the Note by Id 
//and returns a JSON object to the client indicating success or failure.

//getNoteById function is taking two arguments request and response, finds the Note by Id and 
//returns a JSON object to the client with Note data

//getNotes function is taking two arguments request and response, finds all the Notes 
//in the collection and returns a JSON object to the client with all the Notes data

//At the end, all of these functions are exported as an object and can be used
// in other parts of the application.


//const Note = require('../models/Note-model') is requiring the Note model, which provides an interface
// for interacting with the Notes collection in the MongoDB database.
const Note = require('../models/notes-model')


//This code is a function that creates a new Note. The function takes in two parameters, 
//a request object (req) and a response object (res).

//It starts by grabbing the request body from the request object, and then checking if 
//it is empty or not. If it is empty, it sends a response with a status code of 400 (Bad Request) 
//and a JSON object indicating that a Note must be provided.

//It then creates a new instance of the Note model with the request body as the parameter. 
//It then checks if this model was created or not. If it wasn't, it sends a response with a
// status code of 400 (Bad Request) and a JSON object indicating an error.

//Next, it saves the Note and creates a success message with the id of the Note. 
//If there's an error the catch block will run and sends a response with a status code of 400 (Bad Request)
// and a JSON object indicating the error, in this way the Note is not created


createNote = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json(
        {
            success: false,
            error: 'You must provide a Note',
        }
        )
    }

//It then creates a new instance of the Note model with the request body as the parameter.
    const note = new Note(body)

    if (!note) {
        return res.status(400).json({ success: false, error: err })
    }

//The Note.save() function is a method that is called on an instance of a Mongoose model. 
//It is used to save the instance to the database.

//In Mongoose, when you create a new instance of a model using the new keyword
// and then call the save() method on that instance, it will insert a new document 
//with the model's properties into the corresponding MongoDB collection.

//Mongoose also provides a few other ways to interact with the database,
// such as the create method which is a more convenient way to create and insert 
//a new 
//document in one step, for example : Note.create(body) instead of new Note(body) .save() .

//When the save() function is called it will validate the object to make sure that 
//all the required fields are present and that any custom validation set up on the model are satisfied.
//If validation fails, it returns a rejected promise with the validation errors
// or if everything goes well it will persist the data to the Database.

/*
Note.save().then(...) is a way to handle the success case of the save() method.

The save() method returns a promise that is fulfilled when the save 
operation is complete. If the save was successful, the promise is
 fulfilled with the value of the saved object. If the save was not successful,
  the promise is rejected with the reason why the save failed.

The .then(...) function is used to handle the case when the promise is fulfilled,
 which is when the save operation was successful. It is called with the fulfilled 
 value of the promise, which in this case is the saved Note object.

In the code provided, it sends a response with status code 201 (Created) 
and a JSON object indicating that the Note was created successfully, along with the id of the new Note.

It is used as a way to run some code after the Note is saved, 
in order to do something with the newly created Note and to
 handle the successful case, for example it could be used for logging, or for any other actions that are dependent on the Note's creation.
  */

/*
 In MongoDB, each document in a collection has a unique identifier called the _id field. By default,
  when you insert a new document into a collection, MongoDB will automatically generate an _id field 
  for the document if one is not specified.

 In Mongoose, when you create a new instance of a model using the new keyword and then call the save() 
 method on that instance, it will insert a new document with the model's properties into the corresponding
  MongoDB collection, Mongoose will use the _id generated by MongoDB to set the id of the object, in this
   way the Note._id is the id automatically generated by MongoDB.
*/

note.save().then(() => {
            return res.status(201).json({
                success: true,
                id: Note._id,
                message: 'Note created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Note not created!',
            })
        })
}


//updateNote function is taking two arguments request and response, checks if the body of the request is 
//present or not and finds the Note by Id, updates the Note and attempts to save the Note to the database
// and returns a JSON object to the client indicating success or failure.

updateNote = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
/*
 This code is using the findOne() function of Mongoose to query the MongoDB database and retrieve
  a single document that matches the specified filter.

findOne() function is a method provided by Mongoose for querying MongoDB collections
 and retrieving a single document that meets the specified criteria. It takes two arguments:

The first argument is a filter object which specifies the conditions
 that documents must meet to be included in the result set. In this case, 
 the filter object is { _id: req.params.id }, which will match the document that has an _id field 
 that matches the req.params.id. req.params.id is the id passed as a parameter in the request.

The second argument is a callback function that will be invoked when the query is
complete. This function takes two parameters: an error object (err) and the retrieved document (Note).

When the query completes, the callback function will be called. If there was an
error with the query, the first parameter passed to the callback will be an error object,
otherwise will be null. If the query is successful and finds a document that matches the 
filter, the second parameter passed to the callback will be the matched document; otherwise, it will be null
 
*/
Note.findOne({ _id: req.params.id }, (err, Note) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Note not found!',
            })
        }
        //update values
        Note.topic = body.topic
        Note.note = body.note
  
        Note
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: Note._id,
                    message: 'Note updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Note not updated!',
                })
            })
    })
}

/*
This code defines an async function called deleteNote that takes in two parameters,
a request object (req) and a response object (res).

It uses the findOneAndDelete method provided by Mongoose to delete a single document 
that matches the specified filter, in this case { _id: req.params.id }. This method 
also accepts a callback function that will be invoked when the operation is complete. 
This function takes two parameters: an error object (err) and the deleted document (Note).

The function checks if there is an error or if the Note does not exist, in both cases it 
sends an appropriate status code and a JSON object indicating the error.
If the deletion is successful, it sends a response with a status code of 200 (OK) and 
a JSON object indicating that the Note was deleted successfully, 
along with the deleted Note's data.

The catch statement at the end of the function handle and log any error that might occur.

It's worth noting that the Mongoose findOneAndDelete method is executed asynchronously,
this is why the await keyword is used before it, to wait until the operation is complete
before proceeding with the execution of the following statement.

*/

deleteNote = async (req, res) => {
    const { topic, note } = req.params;
    try {
        const deletedNote = await Note.findOneAndDelete({ topic, note });
        if (!deletedNote) {
            return res.status(404).json({ success: false, error: 'Note not found' });
        }
        return res.status(200).json({ success: true, data: deletedNote });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
}

/*return res.status(200).json({ success: true, data: Note })
This line of code is sending an HTTP response to the client with a status code of 200 and a
 JSON object as the body of the response.

The res.status(200) is setting the status code of the response object to 200, which is
 the standard HTTP status code indicating that the request has succeeded.

The .json() method sends a JSON response to the client, in this case
 it sends a JSON object with two properties:

success: set to true
data: the Note object that was deleted
This JSON response allows the client to know that the request was successful and to access the data that was deleted.

This will be the final message that the client will recieve, indicating that the Note deletion was successful.

*/


getNoteById = async (req, res) => {
    await Note.findOne({ _id: req.params.id }, (err, Note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: Note })
    }).catch(err => console.log(err))
}


getNotes = async (req, res) => {
    try {
        const notes = await Note.find({});
        if (!notes.length) {
            return res.status(404).json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: notes });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
};

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes,
    getNoteById,
}