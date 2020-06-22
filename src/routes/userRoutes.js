const router = require('express').Router();
const {
    users,
    singinUser,
    registerUser,
    userById,
    updateUserById,
    deleteUserById
} = require('../controllers/userControllers');

const {
    validateToken,
    validateSigninParams,
    validateRegisterParams,
    validateRol,
    validateUserId
} = require('../middlewares/middlewares');

router.get('/', [validateToken, validateRol], users);
router.post('/singin', [validateSigninParams], singinUser);
router.post('/', [validateRegisterParams], registerUser);
router.get('/:idUser', [validateToken, validateUserId], userById);
router.put('/:idUser', [validateToken, validateUserId, validateRegisterParams], updateUserById);
router.delete('/:idUser', [validateToken, validateRol], deleteUserById);

module.exports = router;