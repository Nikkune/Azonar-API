const mongoose = require("mongoose");

const UsersModel = mongoose.model(
    "users",
    {
        pseudonym: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    },
    "users"
);

module.exports = {UsersModel};