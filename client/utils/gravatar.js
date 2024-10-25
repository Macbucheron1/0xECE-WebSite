import crypto from "crypto";

function generateGravatarUrl(email, size = 80) {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash("sha256").update(trimmedEmail).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

// Example usage
const email = "nathan.deprat@edu.ece.fr";
const size = 200; // Optional size parameter
const gravatarUrl = generateGravatarUrl(email, size);

console.log("Gravatar URL:", gravatarUrl);

export { generateGravatarUrl };
