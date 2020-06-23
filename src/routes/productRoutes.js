const router = require('express').Router();
const {
    products,
    productById,
    createProduct,
    updateProduct,
    deleteProductById
} = require('../controllers/productControllers');

const {
    validateToken,
    validateRol,
    validateProductParams
} = require('../middlewares/middlewares');

router.get('/', products);
router.post('/', [validateToken, validateRol], createProduct)
router.get('/:idProduct', productById);
router.put('/:idProduct', [validateToken, validateRol, validateProductParams], updateProduct);
router.delete('/:idProduct', [validateToken, validateRol], deleteProductById);

module.exports = router;