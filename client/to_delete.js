const jwt = require("jsonwebtoken");

// Replace 'your-256-bit-secret' with your actual secret
const secret =
  "p3/D5Aj6lXz0UF1qGI9l2kFK14BWSOksMW885Krt277drKoMkteXt5MUQG7ODA6c0z78hRxVniUlZNa75mRtGQ==";

// Define the payload for the JWT
const payload = {
  name: "Functions",
};

// Generate the JWT token
const token = jwt.sign(payload, secret, {
  algorithm: "HS256",
  expiresIn: "1h",
});

console.log("Generated JWT Token:", token);
