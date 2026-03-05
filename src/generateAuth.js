import fs from "fs-extra";
import path from "path";

export async function generateAuthMiddleware(answers, targetDir) {
  const auth_file = path.join(targetDir, "/src/middleware/auth.js");
  if (answers.authType == "JWT") {
    // Writing auth middleware for jwt authType
    const obj = `
import {sign , verify} from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET; 

// Create Token
export function generateToken(user) {
  return sign(
    { id: user.id, email: user.email }, // payload
    SECRET,
    { expiresIn: "1h" }
  );
}

// Middleware to Protect Routes
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {
    const decoded = verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}
`;

    await fs.outputFile(auth_file, obj);
  } else if (answers.authType == "API KEY") {
    // Writing auth middleware for api key authType
    const obj = `
const API_KEY = process.env.API_KEY; 

export function authenticateApiKey(req, res, next) {
  const key = req.headers["x-api-key"];

  if (!key) {
    return res.status(401).json({ message: "API key required" });
  }

  if (key !== API_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
}
`;
    await fs.outputFile(auth_file, obj);
  } else {
    console.log("\nNo auth middleware required!");
  }
}
