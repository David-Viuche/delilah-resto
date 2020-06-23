const { validateToken } = require('./jwt');
const { db, Sequelize } = require('../../database');

module.exports = {

    validateToken(req, res, next) {
        const auth = req.headers.authorization;

        if (auth) {
            const token = auth.split(' ')[1];
            const user = validateToken(token);
            if (user) {
                req.params.user = user;
                next();
            } else {
                res.status(401).json({ msg: 'Missing token or invalid' })
            }
        } else {
            res.status(401).json({ msg: 'Missing token or invalid' })
        }
    },

    validateSigninParams(req, res, next) {
        const { user_mail, user_password } = req.body;
        if (user_mail && user_password) {
            next();
        } else {
            res.status(400).json({ error: "Invalidate params all parameters are necessary" });
        }
    },

    validateRegisterParams(req, res, next) {
        const { user_name, user_lastname, user_mail, user_phone, user_password, user_address, user_admin } = req.body;

        if (user_name && user_lastname && user_mail && user_phone && user_password && user_address && user_admin == false || user_admin == true) {
            next();
        } else {
            res.status(400).json({ error: "Invalidate params all parameters are necessary" });
        }
    },

    validateRol(req, res, next) {
        const user = req.params.user;
        if (user.user_admin == 1) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized user to do this operation' });
        }
    },

    validateUserId(req, res, next) {
        const { user, idUser } = req.params;

        if (user.user_admin == 0 && user.user_id == idUser) {
            next();
        } else {
            if (user.user_admin == 1) {
                next();
            } else {
                res.status(401).json({ error: 'Unauthorized user to perform this operation, you cannot access the data of other users' });
            }
        }

    },

    validateExistingUserId(req, res, next) {
        const userId = req.params.idUser;
        db.query('SELECT * FROM Users WHERE user_id = ?',
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: [userId]
            })
            .then(result => {
                if (result.length != 0) {
                    next();
                } else {
                    res.status(404).json({ error: 'user not found' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'internal error' });
            });
    },

    validateSesionUser(req, res, next){
        const user = req.params.user;
        db.query('SELECT * FROM Users WHERE user_id = ?',
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: [user.user_id]
            })
            .then(result => {
                if (result[0].user_active != 0) {
                    next();
                } else {
                    res.status(401).json({ error: 'user is not logged in' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'internal error' });
            });
    },

    validateProductParams(req, res, next) {
        const { product_name, product_price, product_description } = req.body;

        if (product_name && product_price && product_description) {
            next();
        } else {
            res.status(400).json({ error: "Invalidate params all parameters are necessary" });
        }
    },

    validateProductId(req, res, next) {
        const productId = req.params.idProduct;
        db.query('SELECT * FROM Products WHERE product_id = ?',
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: [productId]
            })
            .then(result => {
                if (result.length != 0) {
                    next();
                } else {
                    res.status(404).json({ error: 'product not found' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'internal error' });
            });
    }
}