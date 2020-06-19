const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Week = new Schema({
    hoursPerDay: {
        type:String
    },
    isTemplate: {
        check: {
            type: Boolean,
            default: false
        },
        name: String
    },
    monday: {
        date: String,
        shifts: [
            {
                from: String,
                to: String,
                employees: [{
                    employeeId: String,
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
                    employeeId: String,
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
                    employeeId: String,
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
                    employeeId: String,
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
                    employeeId: String,
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
                    employeeId: String,
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
                    employeeId: String,
                    name: String
                }]
            }
        ]
    }
});



module.exports = mongoose.model('Week', Week);