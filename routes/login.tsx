import AuthenticationForm from "../components/AuthenticationForm.tsx";
import { Handlers } from "$fresh/server.ts";
import { isAuthenticated } from "../lib/utils.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const isAuthned = isAuthenticated(ctx);
    return ctx.render({ isAuthenticated: isAuthned });
  },
};

export default function Login(props) {
  const { isAuthenticated } = props.data;
  return (
    <>
      {isAuthenticated ? <h3>You're already logged in!</h3> : (
        <div>
          <AuthenticationForm />
        </div>
      )}
    </>
  );
}
