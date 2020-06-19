const Week = require('../models/Week');

const getAllWeeks = (req, res) => {
    Week.find()
        .then(weeks => {
            console.log('get on /weeks')
            res.send(weeks)
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
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body
    console.log(req.body)
    let newWeek = new Week({ monday, tuesday, wednesday, thursday, friday, saturday, sunday })
    newWeek.save()
        .then(week => {
            res.send(week)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

module.exports = { getAllWeeks, createWeek, getWeekById, findWeekByDate }