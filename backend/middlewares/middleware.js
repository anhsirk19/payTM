const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if(token){
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if(err){
                    return res.status(403).json({
                        success : "false",
                        message : "un authorized access"
                    })
                }else{
                    req.body.id = decode.id;
                    next();
                }
            })
        }else{
            return res.status(401).json({
                success : false,
                message : "send token"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'please provide auth token',
            e
        })
    }
   
}

module.exports = authMiddleware;