const casual = require('casual')

const Employee = require('../models/Employee')

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const getAllEmployees = (req, res) => {
    Employee.find().sort( { firstName: 1 } )
        .then(employees => {
            employees.sort(() => {

            })
            res.send(employees)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const createEmployee = (req, res) => {
    const { firstName, lastName, phone, email } = req.body
    let newEmployee = new Employee({ firstName, lastName, phone, email })
    newEmployee.save()
        .then(employee => {
            res.send(employee)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const searchFor = (req, res) => {
    const regex = new RegExp(escapeRegex(req.params.query), 'gi');
    Employee.find({ $or : [ {"firstName": regex}, {"lastName": regex} ]})
        .then(employees => {
            res.send(employees)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const addShift = (req, res) => {

    const { weekId, day, date, shiftIndex, from, to} = req.body
    console.log({ weekId, day, date, shiftIndex, from, to })

    Employee.findByIdAndUpdate(
        req.params.id, 
        { $push: {shifts: { weekId, day, date, shiftIndex, from, to } } }, 
        {new: true} 
        )
        .then(response => {
            console.log(response)
            res.send('shift added')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const adminFix = (req, res) => {
    for (i = 0; i < 50; i ++) {

        const firstName = casual.first_name
        const lastName = casual.last_name
        const phone = casual.phone
        const email = casual.email

        let newEmployee = new Employee({ firstName, lastName, phone, email })
        newEmployee.save()
            .then(employee => {
                console.log(employee)
            })
            .catch(err => {
                console.log(err)
            })
    }
    res.send('seeding')
}

module.exports = { getAllEmployees, createEmployee, searchFor, adminFix, addShift }