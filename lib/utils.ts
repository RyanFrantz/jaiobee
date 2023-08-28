import { setCookie } from "https://deno.land/std@0.195.0/http/cookie.ts";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "../lib/constants.ts";
import { AppContext } from "$fresh/server.ts";

// Return the milliseconds since epoch.
const epoch = () => {
  return Date.now();
};

const epochToLocale = (
  epoch: string,
  locale: string = "en-US",
  timeZone: string = "America/New_York",
): string => {
  const millis = parseInt(epoch);
  const d = new Date(millis);
  return d.toLocaleString(locale, {
    timeZone: timeZone,
    timeZoneName: "short", // EDT, PDT, etc.
  });
};

/* A set of regular expressions representing routes we'll use to check for
 * the presence of a cookie.
 * NOTE: This being the top-level middleware, we'll omit some routes we
 * want to protect and instead do something similar in lower-level
 * middleware.
 * For example, /api routes will be protected in in routes/api/_middleware.ts.
 */
const protectedRoutes = [
  /^\/contacts/,
  /^\/role/, // /roles, /role/[id]...
  /^\/profile/,
];

// Returns truthy if a URL path matches a protected route; falsy otherwise.
// Useful to avoid doing work like validating JWTs on resources like static
// assets and /_frsh/
const isProtectedRoute = (path) => {
  return protectedRoutes.find((re) => path.match(re));
};

// Our middlware sets (and unsets) the userId property in the app context's
// `state` property. If it's present, the user has been authenticated.
const isAuthenticated = (ctx: AppContext) => {
  return Object.keys(ctx?.state).includes("userId");
};

// Given an access and refresh token, generate cookie headers.
// TODO: Extend this to accept values for cookie maxAge.
const genCookies = (url: URL, access_token: string, refresh_token: string) => {
  const headers = new Headers();
  setCookie(headers, {
    name: ACCESS_COOKIE,
    value: access_token,
    maxAge: 3600, // 1 hour; the JWT matches this lifetime
    sameSite: "lax",
    domain: url.hostname,
    path: "/",
    secure: true,
  });
  setCookie(headers, {
    name: REFRESH_COOKIE,
    value: refresh_token,
    maxAge: 86400, // 1 day; Supabase docs don't describe this lifetime
    sameSite: "lax",
    domain: url.hostname,
    path: "/",
    secure: true,
  });

  return headers;
};

export { epoch, epochToLocale, genCookies, isAuthenticated, isProtectedRoute };
