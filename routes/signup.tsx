import AuthenticationForm from "../components/AuthenticationForm.tsx";
import { Handlers } from "$fresh/server.ts";
import { isAuthenticated } from "../lib/utils.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const isAuthned = isAuthenticated(ctx);
    const url = new URL(req.url);
    const error = url.searchParams.get("error");
    if (error) {
      return ctx.render({ error: error });
    }
    return ctx.render({ isAuthenticated: isAuthned });
  },
};

export default function Login(props) {
  const { isAuthenticated, error } = props.data;
  return (
    <>
      {isAuthenticated ? <h3>You're already logged in!</h3> : (
        <div>
          {error &&
            (
              <>
                <p>{error}. Let's try again!</p>
              </>
            )}
          <AuthenticationForm signup="true" />
        </div>
      )}
    </>
  );
}
