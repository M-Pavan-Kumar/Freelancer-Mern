const jwt=require("jsonwebtoken")

module.exports=function(req,res,next){
    try{
        const token=req.header("x-auth-token");
        if(!token){
            return res.status(401).send({msg:"Access denied. No token provided."})
        }
        let decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decoded.user;
        next();
    }
    catch (err){
        console.log(err)
        return res.status(400).send("Authentication error");
    }
}