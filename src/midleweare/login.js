const jwt = require('jsonwebtoken');
const Admin = require("../models/admin.schema");
require("dotenv").config();

const loginfunction = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Malformed token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);



        const user = await Admin.findById(decoded.userid);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: qardasim sef elemisen' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Token verification error:", error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = loginfunction;
