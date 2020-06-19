const express = require('express')
const router = express.Router()

const { getAllWeeks, createWeek, getWeekById, findWeekByDate } = require('../controllers/week_controller')

router.get('/', getAllWeeks)
router.get('/single/:id', getWeekById)
router.get('/bydate', findWeekByDate)

router.post('/create', createWeek)

module.exports = router