const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    number: {
        type: String,
        required: [true, "Please add the contact information"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("contacts", contactSchema);
