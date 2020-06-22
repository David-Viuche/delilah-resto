const { db, Sequelize } = require('../../database');
const { generateToken } = require('../middlewares/jwt');

const controller = {}

controller.users = (req, res) => {
    db.query('SELECT * FROM Users',
        {
            type: Sequelize.QueryTypes.SELECT
        })
        .then((users) => {
            res.json(users);
        })

}

controller.singinUser = (req, res) => {
    const { user_mail, user_password } = req.body;
    db.query('SELECT * FROM Users Where user_mail = ? AND user_password = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [user_mail, user_password]
        })
        .then((userIdentified) => {

            if (userIdentified.length != 0) {
                db.query('UPDATE Users SET user_active = 1 WHERE Users.user_id = ?',
                    {
                        type: Sequelize.QueryTypes.UPDATE,
                        replacements: [userIdentified[0].user_id]
                    })
                    .then((result) => {
                        let user = userIdentified[0];
                        const { user_id, user_name, user_lastname, user_phone, user_mail, user_address, user_admin } = user;
                        const token = generateToken({ user_id: user_id, user_admin: user_admin });
                        res.json({
                            token: token,
                            user: {
                                user_name,
                                user_lastname,
                                user_phone,
                                user_mail,
                                user_address
                            }
                        });
                    })
            } else {
                res.status(401).json({ error: 'user does not exist or invalid credentials' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

controller.registerUser = (req, res) => {
    const { user_name, user_lastname, user_mail, user_phone, user_password, user_address, user_admin } = req.body;
    db.query('INSERT INTO Users (user_name, user_lastname, user_mail, user_phone, user_password, user_address, user_admin) VALUES (?,?,?,?,?,?,?)',
        {
            type: Sequelize.QueryTypes.INSERT,
            replacements: [user_name, user_lastname, user_mail, user_phone, user_password, user_address, user_admin]
        })
        .then(result => {
            res.json({ msg: 'user successfully created' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

controller.userById = (req, res) => {
    const userId = req.params.idUser;
    db.query('SELECT * FROM Users WHERE user_id = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [userId]
        })
        .then(result => {
            if (result.length != 0) {
                res.json(result);
            } else {
                res.status(404).json({ error: 'user not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

controller.updateUserById = (req, res) => {
    const userId = req.params.idUser;
    const { user_name, user_lastname, user_mail, user_phone, user_password, user_address, user_admin } = req.body;
    db.query('UPDATE Users SET user_name = ?, user_lastname = ?, user_mail = ?, user_phone = ?, user_password = ?, user_address = ?, user_admin = ? WHERE user_id = ?',
        {
            type: Sequelize.QueryTypes.UPDATE,
            replacements: [user_name, user_lastname, user_mail, user_phone, user_password, user_address, user_admin, userId]
        })
        .then(result => {
            if (result[1] != 0) {
                res.json({ msg: 'user successfully updated' });
            } else {
                db.query('SELECT * FROM Users WHERE user_id = ?',
                    {
                        type: Sequelize.QueryTypes.SELECT,
                        replacements: [userId]
                    })
                    .then(result => {
                        if (result.length != 0) {
                            res.json({ msg: 'user successfully updated' });
                        } else {
                            res.status(404).json({ error: 'user not found' });
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

controller.deleteUserById = (req, res) => {
    const userId = req.params.idUser;
    db.query('DELETE FROM Users WHERE user_id = ?',
        {
            type: Sequelize.QueryTypes.DELETE,
            replacements: [userId]
        })
        .then(result => {
            res.json({ msg: 'user successfully deleted' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

module.exports = controller;