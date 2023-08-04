import { Handlers } from "$fresh/server.ts";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "../lib/constants.ts";
import { deleteCookie } from "https://deno.land/std@0.195.0/http/cookie.ts";

// Delete all relevant cookies and redirect to /login.
export const handler: Handlers = {
  async GET(_req, ctx) {
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
  },
};
