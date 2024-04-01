const asyncHandler = require('express-async-handler');
const Contacts = require('../modules/contactsModels')

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contacts.find({user_id : req.user.id});
    res.status(200).json(contacts)
})

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contacts.findById(req.user.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }  
    res.status(200).json(contact)
}
)
const createContact = asyncHandler(async(req, res) => {
    console.log(req.body);
    const {name, number, email} = req.body;
        if (!name || !number || !email) {
            res.status(404)
            throw new Error("")
        }
        const contacts = await Contacts.create({ name, number, email, user_id : req.user.id });
        console.log("Contact created:", contacts);
        res.status(201).json(contacts);
        console.error("Error creating contact:", error);
        res.status(500).json({ error: "Failed to create contact" });
});


const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contacts.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }  

    if(contact.user_id.toString() != req.user.id){
        req.status(403);
        throw new Error("User is not permission to update contact")
    }

    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new : true
        }
    )
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async(req, res) => {
        const contact = await Contacts.findById(req.params.id)
        if(!contact){
            res.status(404)
            throw new Error("All field Required")
        }
        if(contact.user_id.toString() != req.user.id){
            req.status(403);
            throw new Error("User is not permission to update contact")
        }
        const result = await Contacts.deleteOne({ _id: req.params.id }); 
        res.json(result)
})


module.exports = {getContacts, createContact, getContact, updateContact, deleteContact }