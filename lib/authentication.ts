// Return the user ID from a JWT's payload.
// NOTE: This function is not intended to verify a JWT.
const userIdFromJwt = (jwt: string) => {
  const encodedPayload = jwt.split('.')[1]; // Ignore header & signature.
  // Base64 -> JSON -> Object
  const payload = JSON.parse(atob(encodedPayload));
  return payload.sub;
};

export { userIdFromJwt };
