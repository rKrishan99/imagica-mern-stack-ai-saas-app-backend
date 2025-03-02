import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   const {token} = req.headers.authorization;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "No token, authorization denied" });
//   }

//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//     if(tokenDecode.id){
//         // req.body.userID = tokenDecode.id;
//         req.user = { id: tokenDecode.id };
//     }else{
//         return res.status(401).json({success: false, message: 'Access Denied'});
//     }

//     next();
//   } catch (error) {
//     console.error("Auth Error:", error);
//     res.status(401).json({ success: false, message: "Token is not valid" });
//   }
// };

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id };
    } else {
      return res.status(401).json({ success: false, message: "Access Denied" });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};


export default userAuth;
