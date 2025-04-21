const jwt_secret = require("../config.js");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if(!token){
            jwt.verify(token, jwt_secret, (err, decode) => {
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