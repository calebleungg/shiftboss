const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Week = new Schema({
    monday: [
        {
            from: Number,
            to: Number,
            employees: [{
                name: String
            }]
        }
    ],
    tuesday: [
        {
            from: Number,
            to: Number,
            employees: [{
                name: String
            }]
        }
    ],
    wednesday: [
        {
            from: Number,
            to: Number,
            employees: [{
                name: String
            }]
        }
    ],
    thursday: [
        {
            from: Number,
            to: Number,
            employees: [{
                name: String
            }]
        }
    ],
    friday: [
        {
            from: Number,
            to: Number,
            employees: [{
                name: String
            }]
        }
    ],
    saturday: [
        {
            from: Number,
            to: Number,
            employees: [{
                name: String
            }]
        }
    ],
    sunday: [
        {
            from: Number,
            to: Number,
            employees: [{
                name: String
            }]
        }
    ],
});



module.exports = mongoose.model('Week', Week);