// authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        
        // Check if Authorization header is missing or not in the correct format
        // if (!authHeader || !authHeader.startsWith("Bearer")) {
        //     return res.status(401).send({
        //         success: false,
        //         message: "Invalid or missing Authorization header",
        //     });
        // }

        const token = req.headers["authorization"].split(" ")[1]; // Extract the token from the header
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Auth Failed!!!",
                });
            } else {
                req.body.userId = decode.userId; // Add decoded user ID to request body
                next(); // Proceed to the next middleware
            }
        });
        
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            message: "Auth Failed",
        });
    }
};

export default authMiddleware;
