import { compare, hash } from "bcryptjs";

// hashing password
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// comparing hashed password with plain password
export async function verifyPassword(password, hashedPassword) {
  const isPasswordCorrect = await compare(password, hashedPassword);
  return isPasswordCorrect;
}
