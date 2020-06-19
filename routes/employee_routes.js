const express = require('express')
const router = express.Router()

const { getAllEmployees, createEmployee, searchFor, adminFix, addShift } = require('../controllers/employee_controller')

router.get('/', getAllEmployees)
router.get('/search/:query', searchFor)

router.put('/add-shift/:id', addShift)

router.post('/create', createEmployee)

// router.get('/admin', adminFix)

module.exports = router