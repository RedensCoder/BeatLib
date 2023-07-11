import jwt from "jsonwebtoken";
import {config} from "dotenv";
config();

export const generateAccessToken = (username, password, email) => {
    return jwt.sign({
        data: {
            username: username,
            password: password,
            email: email
        }
    }, process.env.SECRET_TOKEN, {expiresIn: "7d"});
}

 export const authenticateToken = (req, res, next) => {
     const token = req.headers['authorization'];
     if (token == null) return res.sendStatus(401);
     jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
         if (err) return res.sendStatus(403)
         next()
     })
 }

 export const authenticateUserToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403)
        
        if (decoded.data.username !== req.params.username) return res.sendStatus(403);
        next()
    })
}