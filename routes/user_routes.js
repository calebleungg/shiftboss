const express = require('express');
const router = express.Router();

const { getUsers, updateAvatar, updateDetails, changePassword, deleteUser, resetPassword } = require('../controllers/user_controller')
const { userAuthenticated } = require('../utils/common_utilities')

router.get('/', userAuthenticated, getUsers)

router.put('/update/avatar/:id', userAuthenticated, updateAvatar)
router.put('/update/details/:id', userAuthenticated, updateDetails)
router.put('/password/change', userAuthenticated, changePassword)


module.exports = router;