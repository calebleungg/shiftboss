const Week = require('../models/Week');

const getAllWeeks = (req, res) => {
    Week.find({"isTemplate.check": false})
        .then(weeks => {
            console.log(weeks)
            console.log('get on /weeks')
            res.send(weeks)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const getTemplates = (req, res) => {
    Week.find({"isTemplate.check": true})
        .then(templates => {
            // console.log(templates)
            res.send(templates)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const findWeekByDate = (req, res) => {
    const { date } = req.query
    // console.log(date)
    Week.findOne({"monday.date": date})
        .then(week => {
            console.log(week)
            res.send(week)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const getWeekById = (req, res) => {
    Week.findById(req.params.id)
        .then(week => res.send(week))
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const createWeek = (req, res) => {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday, isTemplate, hoursPerDay } = req.body
    console.log(req.body)
    let newWeek = new Week({ monday, tuesday, wednesday, thursday, friday, saturday, sunday, hoursPerDay, isTemplate })
    newWeek.save()
        .then(week => {
            res.send(week)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

const addEmployee = (req, res) => {
    const { employeeId, name, day, shiftIndex } = req.body
    console.log({ employeeId, name, day, shiftIndex })

    Week.findById(req.params.id)
        .then(week => {
            let updatedDay = week[day]
            updatedDay.shifts[shiftIndex].employees.push({employeeId, name})
            
            week.update({[day] : updatedDay})
                .then(response => {
                    res.send(response)
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
        })
        .catch(err => console.log(err))

}

module.exports = { getAllWeeks, createWeek, getWeekById, findWeekByDate, addEmployee, getTemplates }