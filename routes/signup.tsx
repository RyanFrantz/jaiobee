import AuthenticationForm from "../components/AuthenticationForm.tsx";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    let activeSession = false;
    const url = new URL(req.url);
    const error = url.searchParams.get("error");
    if (error) {
      return ctx.render({ error: error });
    }
    return ctx.render({ activeSession: activeSession });
  },
};

export default function Login(props) {
  const { activeSession, error } = props.data;
  return (
    <>
      {activeSession ? <h3>You're already logged in!</h3> : (
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
