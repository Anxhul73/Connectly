const jwt = require("jsonwebtoken");

const protect = async ( req, res, next ) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log(authHeader);
        

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Try after Logging in"
            });
        }

        const token = authHeader.split(" ")[1];
        // console.log(token);
        
        // console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        
        res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }
}

module.exports = protect;