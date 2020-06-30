const router = require('express').Router();
const {
    createOrder,
    allOrders,
    orderById,
    updateOrder
} = require('../controllers/orderControllers');

const {
    validateOrderParams,
    validateToken,
    validateSesionUser,
    validateExistingOrderId,
    validateOrdersByRol,
    validateOrderStateParams,
    validateExistingOrder,
    validateRol
} = require('../middlewares/middlewares');

router.get('/', [validateToken, validateSesionUser, validateOrdersByRol], allOrders);
router.get('/:idOrder', [validateToken, validateSesionUser, validateExistingOrderId], orderById);
router.post('/', [validateToken, validateSesionUser, validateOrderParams], createOrder);
router.patch('/admin/:idOrder', [validateToken, validateSesionUser, validateRol, validateOrderStateParams, validateExistingOrder], updateOrder);

module.exports = router;