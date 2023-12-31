import { Handlers } from "$fresh/server.ts";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "../lib/constants.ts";
import { deleteCookie } from "https://deno.land/std@0.195.0/http/cookie.ts";
import { sendMetric } from "../lib/metrics.ts";

// Delete all relevant cookies and redirect to /login.
export const handler: Handlers = {
  async GET(req, ctx) {
     const url = new URL(req.url);
    // Clear user state.
    ctx.state.userId = undefined;
    // Clear cookies and redirect to /login.
    const headers = new Headers();
    deleteCookie(headers, ACCESS_COOKIE, {path: "/", domain: url.hostname});
    deleteCookie(headers, REFRESH_COOKIE, {path: "/", domain: url.hostname});
    headers.set("location", "/login");
    sendMetric("signoutSuccess");
    return new Response("", {
      headers: headers,
      status: 302,
    });
  },
};
