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
        weekId: String,
        day: String,
        date: String,
        shiftIndex: Number,
        from: String,
        to: String,
    }] 
});



module.exports = mongoose.model('Employee', Employee);