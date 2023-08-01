import supabase from "./supabase.ts";

// Return the user ID from a JWT's payload.
// NOTE: This function is not intended to verify a JWT.
const userIdFromJwt = (jwt: string) => {
  const encodedPayload = jwt.split(".")[1]; // Ignore header & signature.
  // Base64 -> JSON -> Object
  const payload = JSON.parse(atob(encodedPayload));
  return payload.sub;
};

// Validate a JWT.
// Supabase offers a getUser() function that effectively provides
// validation. If there is an error, we'll declare the JWT invalid.
// NOTE: _We_ can't validate the signature ourselves. At least, their docs
// don't define their JWKS URL.
const isValidJWT = async (jwt: string) => {
  // data includes a 'user' property we could inspect, if we want.
  const { _data, error } = await supabase.auth.getUser(jwt);
  // AuthApiError: invalid JWT: unable to parse or verify signature, illegal base64 data at   input byte 48
  if (error) {
    console.log(`Failed to verify JWT: ${error.message}`);
    return false;
  }
  return true;
};

export { isValidJWT, userIdFromJwt };
