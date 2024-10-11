import * as jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const verifyToken = (token: string): string => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret) as {
      userId: string;
    };

    // console.log("olaaa", decoded);

    return decoded.userId;
  } catch (error) {
    throw new Error("Token invalido");
  }
};

export default verifyToken;
