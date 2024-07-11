const router = require('express').Router();
const authController=require('../controllers/auth')
const userController=require('../controllers/user')
const authenticateToken = require('../middlewares/authenticationMiddleware')
const { validateRequest, referralSchema } = require('../middlewares/validationMiddleware');


router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/referral', authenticateToken, validateRequest(referralSchema), userController.referral)

module.exports = router