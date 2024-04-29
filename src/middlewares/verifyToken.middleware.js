const jwt = require("jsonwebtoken");


function verifyToken (req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            return res.status(403).json({ status: 0, msg: "Forbiden!"});
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err) {
                return res.status(401).json({ status: 0, msg: "Unauthorized"});
            }
            req.user_email = data.user_email;
            next();
        });
    } catch (error) {
        return res
            .status(500)
            .json({status: 0, msg: "Server Error", error: error.message})
    }
}

module.exports = {
    verifyToken
}