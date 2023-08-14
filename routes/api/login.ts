import { Handlers } from "$fresh/server.ts";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "../../lib/constants.ts";
import { setCookie } from "https://deno.land/std@0.195.0/http/cookie.ts";
import supabase from "../../lib/supabase.ts";
import { userIdFromJwt } from "../../lib/authentication.ts";
import { updateLastLogin } from "../../lib/store.ts";
import { sendMetric } from "../../lib/metrics.ts";

// TODO: Offer the user a chance to log in again if they experience an error.
const login = async (email: string, password: string): [number, object] => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    sendMetric("loginFailed");
    return [error.status, { message: `Login failed: ${error.message}` }];
  }
  const userId = userIdFromJwt(data.session.access_token);
  await updateLastLogin(userId);

  // TODO: Look up a user's payments status. If they're beyond a trial period,
  // redirect them to a checkout page.
  sendMetric("loginSuccess");
  return [302, {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    message: "Successfully signed in",
  }];
};

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    let form;
    try {
      form = await req.formData();
    } catch (err) {
      const msg = `Invalid input! ${err}`;
      return new Response(JSON.stringify({ message: msg }), { status: 400 });
    }
    const email = form.get("email");
    const password = form.get("password");
    const [responseCode, msg] = await login(email, password);
    const headers = new Headers();
    headers.set("content-type", "application/json");
    headers.set("location", "/roles");
    // TODO: Detect if an existing cookie exists? If so, replace it.
    // Though I think setCookie() does that automatically.
    if (responseCode == 302) {
      setCookie(headers, {
        name: ACCESS_COOKIE,
        value: msg.access_token,
        maxAge: 3600, // 1 hour; the JWT matches this lifetime
        sameSite: "lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });
      setCookie(headers, {
        name: REFRESH_COOKIE,
        value: msg.refresh_token,
        maxAge: 86400, // 1 day; Supabase docs don't describe this lifetime
        sameSite: "lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });
    }
    return new Response(
      JSON.stringify(msg),
      {
        headers: headers,
        status: responseCode,
      },
    );
  },
};
