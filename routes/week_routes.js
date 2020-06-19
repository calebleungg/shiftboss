const express = require('express')
const router = express.Router()

const { getAllWeeks, createWeek, getWeekById, findWeekByDate, addEmployee, getTemplates } = require('../controllers/week_controller')

router.get('/', getAllWeeks)
router.get('/templates', getTemplates)
router.get('/single/:id', getWeekById)
router.get('/bydate', findWeekByDate)

router.put('/add-employee/:id', addEmployee )

router.post('/create', createWeek)

module.exports = router