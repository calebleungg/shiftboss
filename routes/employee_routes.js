const express = require('express')
const router = express.Router()

const { getAllEmployees, createEmployee, searchFor, adminFix, addShift, removeShift } = require('../controllers/employee_controller')

router.get('/', getAllEmployees)
router.get('/search/:query', searchFor)

router.put('/add-shift/:id', addShift)
router.put('/remove-shift/:id', removeShift)

router.post('/create', createEmployee)

// router.get('/admin', adminFix)

module.exports = router