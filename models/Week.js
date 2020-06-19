const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Week = new Schema({
    monday: {
        date: String,
        shifts: [
            {
                from: String,
                to: String,
                employees: [{
                    name: String
                }]
            }
        ]
    },
    tuesday: {
        date: String,
        shifts: [
            {
                from: String,
                to: String,
                employees: [{
                    name: String
                }]
            }
        ]
    },
    wednesday: {
        date: String,
        shifts: [
            {
                from: String,
                to: String,
                employees: [{
                    name: String
                }]
            }
        ]
    } ,
    thursday: {
        date: String,
        shifts: [
            {
                from: String,
                to: String,
                employees: [{
                    name: String
                }]
            }
        ]
    },
    friday: {
        date: String,
        shifts: [
            {
                from: String,
                to: String,
                employees: [{
                    name: String
                }]
            }
        ]
    } ,
    saturday: {
        date: String,
        shifts: [
            {
                from: String,
                to: String,
                employees: [{
                    name: String
                }]
            }
        ]
    },
    sunday: {
        date: String,
        shifts: [
            {
                from: String,
                to: String,
                employees: [{
                    name: String
                }]
            }
        ]
    }
});



module.exports = mongoose.model('Week', Week);