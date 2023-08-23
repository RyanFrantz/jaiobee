import { MiddlewareHandlerContext } from "$fresh/server.ts";
import {
  deleteCookie,
  getCookies,
} from "https://deno.land/std@0.195.0/http/cookie.ts";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "../lib/constants.ts";
import supabase from "../lib/supabase.ts";
import { isValidJWT, userIdFromJwt } from "../lib/authentication.ts";
import { genCookies, isProtectedRoute } from "../lib/utils.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const cookies = getCookies(req.headers);
  const url = new URL(req.url);

  if (isProtectedRoute(url.pathname)) {
    // As long as our cookie is present and defined...
    if (cookies[ACCESS_COOKIE]) {
      const validJWT = await isValidJWT(cookies[ACCESS_COOKIE]);
      if (!validJWT) {
        // Clear user state.
        ctx.state.userId = undefined;
        // Clear cookies and redirect to /login.
        const headers = new Headers();
        deleteCookie(headers, ACCESS_COOKIE);
        deleteCookie(headers, REFRESH_COOKIE);
        headers.set("location", "/login");
        return new Response("", {
          headers: headers,
          status: 302,
        });
      }
      // ...pass this information along in context.
      ctx.state.userId = userIdFromJwt(cookies[ACCESS_COOKIE]);
    } else {
      if (cookies[REFRESH_COOKIE]) {
        console.log("Attempting token refresh");
        const { data, error } = await supabase.auth.refreshSession({
          refresh_token: cookies[REFRESH_COOKIE],
        });
        if (error) {
          console.log(
            `Failed to refresh token: ${error.message}. Redirecting to /login`,
          );
          // Clear user state.
          ctx.state.userId = undefined;
          // Clear cookies and redirect to /login.
          const headers = new Headers();
          deleteCookie(headers, ACCESS_COOKIE);
          deleteCookie(headers, REFRESH_COOKIE);
          // TODO: Append a ?redirect_to param that /login can redirect
          // to on success.
          headers.set("location", "/login");
          return new Response("", {
            headers: headers,
            status: 302,
          });
        }
        // Extract the tokens from the session.
        const { access_token, refresh_token } = data.session;
        const headers = genCookies(url, access_token, refresh_token);
        // Reset userId in context.
        ctx.state.userId = userIdFromJwt(access_token);
        const resp = await ctx.next();
        // Append cookie headers to the response.
        for (const [headerName, headerValue] of headers) {
          resp.headers.append(headerName, headerValue);
        }
        return resp;
      }
      // Sane default.
      ctx.state.userId = undefined; // Be certain this is unset!
      url.pathname = "/login";
      return Response.redirect(url);
    }
  } // end `if (isProtectRoute()`

  // Set userId in context even for non-protected routes.
  if (cookies[ACCESS_COOKIE]) {
    ctx.state.userId = userIdFromJwt(cookies[ACCESS_COOKIE]);
  }

  const resp = await ctx.next();
  return resp;
}
