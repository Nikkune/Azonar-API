const mongoose = require("mongoose");

const UsersModel = mongoose.model(
    "users",
    {
        pseudonym: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: false
        },
        token: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false
        },
        status: {
            type: Number,
            required: false
        }
    },
    "users"
);

module.exports = {UsersModel};