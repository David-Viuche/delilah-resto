const router = require('express').Router();
const {
    users,
    singinUser,
    registerUser,
    userById,
    updateUserById,
    deleteUserById,
    logoutUser
} = require('../controllers/userControllers');

const {
    validateToken,
    validateSigninParams,
    validateRegisterParams,
    validateRol,
    validateUserId,
    validateExistingUserId,
    validateSesionUser
} = require('../middlewares/middlewares');

router.get('/', [validateToken, validateSesionUser, validateRol], users);
router.post('/singin', [validateSigninParams], singinUser);
router.post('/logout/:idUser', [validateToken, validateSesionUser, validateUserId, validateExistingUserId], logoutUser);
router.post('/', [validateRegisterParams], registerUser);
router.get('/:idUser', [validateToken, validateSesionUser, validateUserId], userById);
router.put('/:idUser', [validateToken, validateSesionUser, validateUserId, validateExistingUserId, validateRegisterParams], updateUserById);
router.delete('/:idUser', [validateToken, validateSesionUser, validateRol, validateExistingUserId], deleteUserById);

module.exports = router;