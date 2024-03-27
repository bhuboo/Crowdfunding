const jwt = require('jsonwebtoken');


// Secret key used to sign and verify the JWT
const secretKey = process.env.JWT;


// Middleware to check JWT for protected routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    // Split the header into "Bearer" and the <token>
    console.log(authHeader, "token authHeader")
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token, "token")
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        req.user = user;
        console.log(user, "dshus")
        next();
    });
};

const verifyAdmin = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // Split the header into "Bearer" and the <token>
    const token = authHeader && authHeader.split(' ')[1];

    // Decode the token
    let decoded = jwt.decode(token);

    if (!decoded) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    if (decoded.usertype == 1) {
        next()
    } else {
        return res.status(401).json({ message: 'sorry to say you that you do not have permission to access this page.' });
    }
}

module.exports = {
    authenticateToken,
    verifyAdmin
}