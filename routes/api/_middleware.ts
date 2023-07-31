import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.195.0/http/cookie.ts";
import { ACCESS_COOKIE } from "../../lib/constants.ts";
import { userIdFromJwt } from "../../lib/authentication.ts";

/* A set of regular expressions representing routes we'll use to check for
 * the presence of a cookie or Authorization header.
 */
const protectedRoutes = [
  /^\/api\/placeholder/
];

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  ctx.state.userId = undefined; // Sane starting point.
  const cookies = getCookies(req.headers);
  // Test for a cookie first, in case the request came via browser.
  if (
    (ACCESS_COOKIE in cookies) &&
    !(cookies[ACCESS_COOKIE] == undefined)
  ) {
    ctx.state.userId = userIdFromJwt(cookies[AUTH_COOKIE_NAME]);
  } else {
    ctx.state.userId = undefined; // Be certain this is unset!
  }

  // Test for Authorization header, otherwise.
  // FIXME: Actually perform a lookup somewhere, obvs.
  if (req.headers.has("Authorization")) {
    ctx.state.userId = "placeholder";
  }

  const url = new URL(req.url);
  const originalPath = url.pathname;
  const isProtected = protectedRoutes.find(re => originalPath.match(re));
  if (!ctx.state.userId && isProtected) {
    return new Response(null, { status: 401 });
  }

  const resp = await ctx.next();
  return resp;
}
