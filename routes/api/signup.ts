import { Handlers } from "$fresh/server.ts";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "../../lib/constants.ts";
import { setCookie } from "https://deno.land/std@0.195.0/http/cookie.ts";
import supabase from "../../lib/supabase.ts";

// If we see these errors, re-attempt signup with that context.
const reattemptSignup = [
  "User already registered"
];

const signUp = async (email: string, password: string): [number, object] => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    if (reattemptSignup.includes(error.message)) {
      const msg = encodeURI(error.message);
      return [error.status, {
        message: `Sign in failed: ${error.message}`,
        reattempt: msg
      }];
    }
    return [error.status, { message: `Sign in failed: ${error.message}` }];
  }

  return [302, {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    message: "Successfully signed in"
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
    let [responseCode, msg] = await signUp(email, password);
    const headers = new Headers();
    headers.set("content-type", "application/json");
    headers.set("location", "/");
    // TODO: Detect if an existing cookie exists? If so, replace it.
    // Though I think setCookie() does that automatically.
    if (responseCode == 302) {
      // Override Location. Get the user started on their first role.
      headers.set("location", "/roles");
      // This cookie's value (JWT) will be validated in middleware.
      setCookie(headers, {
        name: ACCESS_COOKIE,
        value: msg.access_token,
        maxAge: 3600, // 1 hour; the JWT matches this lifetime
        sameSite: "lax",
        domain: url.hostname,
        path: "/",
        secure: true
      });
      setCookie(headers, {
        name: REFRESH_COOKIE,
        value: msg.refresh_token,
        maxAge: 86400, // 1 day; Supabase docs don't describe this lifetime
        sameSite: "lax",
        domain: url.hostname,
        path: "/",
        secure: true
      });
    }

    // Pass a query param to signup and allow the user to reattempt.
    if (msg.reattempt) {
      headers.set("location", `/signup?error=${msg.reattempt}`);
      responseCode = 302;
    }

    return new Response(
      JSON.stringify(msg),
      { 
        headers: headers,
        status: responseCode
      }
    );
  },
};
