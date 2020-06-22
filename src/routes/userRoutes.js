const router = require('express').Router();
const { users, singinUser, registerUser } = require('../controllers/userControllers');
const { 
    validateToken, 
    validateSigninParams, 
    validateRegisterParams,
    validateRol
} = require('../middlewares/middlewares');

router.get('/', [validateToken,validateRol], users);
router.post('/singin', [validateSigninParams], singinUser);
router.post('/', [validateRegisterParams], registerUser)

module.exports = router;