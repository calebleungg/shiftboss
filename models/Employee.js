const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    shifts: [{
        date: String,
        shift: String
    }] 
});



module.exports = mongoose.model('Employee', Employee);