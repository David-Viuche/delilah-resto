const { db, Sequelize } = require('../../database');

const createOrder = (req, res) => {

    const { order_description, order_form_payment, order_total_price, order_id_user, order_products } = req.body;

    db.query('INSERT INTO Orders (order_description, order_form_payment, order_total_price, order_id_user) VALUES (?,?,?,?)',
        {
            type: Sequelize.QueryTypes.INSERT,
            replacements: [order_description, order_form_payment, order_total_price, order_id_user]
        })
        .then(async result => {
            let order_id = 0;

            let found_order = await db.query('SELECT * FROM Orders WHERE order_description = ? AND order_total_price = ? AND order_id_user = ?',
                {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: [order_description, order_total_price, order_id_user]
                })

            order_id = found_order.pop().order_id;

            order_products.forEach(async el => {
                try {
                    await db.query('INSERT INTO Order_detail (order_id, product_id, quantity) VALUES (?,?,?)',
                        {
                            type: Sequelize.QueryTypes.INSERT,
                            replacements: [order_id, el.product_id, el.quantity]
                        }
                    )
                } catch (err) {
                    console.log(err);
                    res.status(500).json({ error: 'internal error' });
                }
            });

            res.status(201).json({ msg: 'order successfully created' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });

}

const allOrders = async (req, res) => {

    const result = req.params.orders;
    for (let index = 0; index < result.length; index++) {

        try {
            let products = await db.query('SELECT Products.*, Order_detail.quantity FROM Order_detail JOIN Products ON Order_detail.product_id = Products.product_id WHERE Order_detail.order_id = ?',
                {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: [result[index].order_id]
                })

            result[index].order_products = products;

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        }
    }

    res.json(result);

}

const orderById = async (req, res) => {

    const result = req.params.order;

    try {
        let products = await db.query('SELECT Products.*, Order_detail.quantity FROM Order_detail JOIN Products ON Order_detail.product_id = Products.product_id WHERE Order_detail.order_id = ?',
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: [result[0].order_id]
            })

        result[0].order_products = products;

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal error' });
    }

    res.json(result);
}

module.exports = {
    createOrder,
    allOrders,
    orderById
}