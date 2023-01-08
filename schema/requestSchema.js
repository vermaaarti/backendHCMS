const mongoose = require('mongoose');


const RequestSchema = new mongoose.Schema(
    {
        to: {
            type: String,
        },
        from: {
            type: String,
        },
        message: {
            type: String,
        },
        contact: {
            type: String,
        },
        type: {
            type: String,
        },
        status: {
            type: String,
            default: 'pending'
        }
    }
);

const Request = mongoose.model('Person', RequestSchema);

module.exports = Request;