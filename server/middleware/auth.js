 import jwt from "jsonwebtoken";

 /** VERIFY TOKEN FUNCTION
  * next optional param - will allow the function to continue
  */
export const verifyToken = (req, res, next) => {
    try{
        //  From the frontend - grabbing the Authorization header.
        // This is where the frontend sets the token - and we will grab it in the backend
        let token = req.header("Authorization");

        // check if the token exists
        if (!token) {
            return res.status(403).send("Access Denied");
        }

         // grabbing the actual token - starting with bearer (token placed next to it)
         if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
         }

         // verifying the token
         const verified = jwt.verify(token, process.env.JWT_SECRET);
         req.student = verified;
         next();  // next() in middleware will allow to move to next step

    } catch(err){
        res.status(500).json({error : err.message});
    }
};