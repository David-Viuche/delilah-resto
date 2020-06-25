const router = require('express').Router();
const {
    createOrder,
    allOrders,
    orderById
} = require('../controllers/orderControllers');

const {
    validateOrderParams,
    validateToken,
    validateOnlyClients,
    validateSesionUser,
    validateExistingOrderId,
    validateOrdersByRol
} = require('../middlewares/middlewares');

router.get('/', [validateToken, validateSesionUser, validateOrdersByRol], allOrders);
router.post('/', [validateToken, validateOnlyClients, validateSesionUser, validateOrderParams], createOrder);
router.get('/:idOrder', [validateToken, validateSesionUser, validateExistingOrderId], orderById);

module.exports = router;