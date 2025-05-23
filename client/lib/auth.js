import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/**
 * Retrieves and decodes the user's JWT from HTTP-only cookies.
 *
 * @async
 * @function getUser
 * @returns {Promise<Object|null>} A promise that resolves to the decoded JWT payload or null if no valid token is present or decoding fails.
 * @throws {Error} If an unexpected error occurs during token decoding.
 */
export async function getUser() {
  // Access the cookies store on the server
  const store = await cookies();

  // Retrieve the value of the "access_token" cookie
  const token = store.get("access_token")?.value;

  // If no token is found, return null (user not authenticated)
  if (!token) return null;

  try {
    // Decode the JWT without verifying its signature
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    // If decoding fails, log and return null
    console.error("Error decoding JWT token:", error);
    return null;
  }
}
