const { db, Sequelize } = require('../../database');

const controller = {}

controller.products = (req, res) => {
    db.query('SELECT * FROM Products',
        {
            type: Sequelize.QueryTypes.SELECT
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

controller.productById = (req, res) => {
    const productId = req.params.idProduct;
    db.query('SELECT * FROM Products WHERE product_id = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [productId]
        })
        .then(result => {
            if (result.length != 0) {
                res.json(result);
            } else {
                res.status(404).json({ error: 'product not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

controller.createProduct = (req, res) => {
    const { product_name, product_price, product_description } = req.body;

    db.query('INSERT INTO Products (product_name, product_price, product_description) VALUES (?,?,?)',
        {
            type: Sequelize.QueryTypes.INSERT,
            replacements: [product_name, product_price, product_description]
        })
        .then(result => {
            res.json({ msg: 'product successfully created' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

controller.updateProduct = (req, res) => {
    const productId = req.params.idProduct;
    const { product_name, product_price, product_description } = req.body;
    db.query('UPDATE Products SET product_name = ?, product_price = ?, product_description = ? WHERE product_id = ?',
        {
            type: Sequelize.QueryTypes.UPDATE,
            replacements: [product_name, product_price, product_description, productId]
        })
        .then(result => {
            if (result[1] != 0) {
                res.json({ msg: 'product successfully updated' });
            } else {
                db.query('SELECT * FROM Products WHERE product_id = ?',
                    {
                        type: Sequelize.QueryTypes.SELECT,
                        replacements: [productId]
                    })
                    .then(result => {
                        if (result.length != 0) {
                            res.json({ msg: 'product successfully updated' });
                        } else {
                            res.status(404).json({ error: 'product not found' });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: 'internal error' });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

controller.deleteProductById = (req, res) => {
    const productId = req.params.idProduct;
    db.query('DELETE FROM Products WHERE product_id = ?',
        {
            type: Sequelize.QueryTypes.DELETE,
            replacements: [productId]
        })
        .then(result => {
            res.json({ msg: 'product successfully deleted' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}


module.exports = controller;