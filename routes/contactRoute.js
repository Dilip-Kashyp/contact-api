const express = require('express');
const route = express.Router();

const {getContacts, createContact, getContact, updateContact, deleteContact} = require('../controllers/contactController');
const vaildateToken = require('../middleware/tokenHandler');

route.use(vaildateToken)
route.get("/", getContacts).post("/", createContact)
route.get("/:id", getContact).put('/:id', updateContact).delete('/:id', deleteContact)

module.exports = route