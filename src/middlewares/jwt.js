const jwt = require("jsonwebtoken");
const { signature } = require('../config/config');

module.exports = {

    generateToken: (info) => {
        const token = jwt.sign(info, signature);
        return token;
    },

    validateToken: (token) => {
        try {
            const decoded = jwt.verify(token, signature);
            return decoded;
        } catch (error) {
            return false;
        }
    }

}