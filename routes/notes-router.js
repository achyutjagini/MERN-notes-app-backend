//This code is defining a set of routes for a Note API using Express.js, and 
//exporting a router that can be used to handle incoming requests to these routes.

//const express = require('express') is requiring the Express.js library,
// which is a popular web application framework for Node.js.

//const NoteCtrl = require('../controllers/Note-ctrl') is requiring the Note-ctrl
// module which exports an object that contains the functions that will handle the different routes.

//const router = express.Router() is creating an instance of an Express router,
// which is used to define the routes for the API.

//router.post('/Note', NoteCtrl.createNote) is defining a route for creating a Note with a HTTP POST 
//request at the path '/Note', and it maps it to the createNote function exported by Note-ctrl.

//router.put('/Note/:id', NoteCtrl.updateNote) is defining a route for updating a
// Note with a HTTP PUT request at the path '/Note/:id', and it maps it to the updateNote 
//function exported by Note-ctrl.

//router.delete('/Note/:id', NoteCtrl.deleteNote) is defining a route for 
//deleting a Note with a HTTP DELETE request at the path '/Note/:id', and it maps
// it to the deleteNote function exported by Note-ctrl.

//router.get('/Note/:id', NoteCtrl.getNoteById) is defining a route for getting a 
//specific Note by id with a HTTP GET request at the path '/Note/:id', and it maps it to the getNoteById
// function exported by Note-ctrl.

//router.get('/Notes', NoteCtrl.getNotes) is defining a route for getting all the Notes with a
// HTTP GET request at the path '/Notes', and it maps it to the getNotes function exported by Note-ctrl.

//module.exports = router is exporting the router object, so it can be used in other parts of the
// application to handle incoming requests that match the routes defined in this file.


const express = require('express')

const NotesCtrl = require('../controllers/notes-ctrl')

//const router = express.Router() is creating an instance of an Express router,
// which is used to define the routes for the API.

const router = express.Router()

//router.post('/Note', NoteCtrl.createNote) is defining a route for creating a Note with a HTTP POST 
//request at the path '/Note', and it maps it to the createNote function exported by Note-ctrl.
router.post('/Note', NotesCtrl.createNote)

//router.put('/Note/:id', NoteCtrl.updateNote) is defining a route for updating a
// Note with a HTTP PUT request at the path '/Note/:id', and it maps it to the updateNote 
//function exported by Note-ctrl.

router.put('/Note/:id', NotesCtrl.updateNote)

//router.delete('/Note/:id', NoteCtrl.deleteNote) is defining a route for 
//deleting a Note with a HTTP DELETE request at the path '/Note/:id', and it maps
// it to the deleteNote function exported by Note-ctrl.
router.delete('/Note/:topic/:note', NotesCtrl.deleteNote);
router.get('/Note/:id', NotesCtrl.getNoteById)
router.get('/Notes', NotesCtrl.getNotes)


module.exports=router