const express = require('express')
const router = express.Router()

const { getAllWeeks, createWeek, getWeekById, findWeekByDate, addEmployee, getTemplates, removeEmployee } = require('../controllers/week_controller')

router.get('/', getAllWeeks)
router.get('/templates', getTemplates)
router.get('/single/:id', getWeekById)
router.get('/bydate', findWeekByDate)

router.put('/add-employee/:id', addEmployee )
router.put('/remove-employee/:id', removeEmployee )

router.post('/create', createWeek)

module.exports = router