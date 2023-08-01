import AuthenticationForm from "../components/AuthenticationForm.tsx";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    let activeSession = false;
    return ctx.render({ activeSession: activeSession });
  },
};

export default function Login(props) {
  const { activeSession } = props.data;
  return (
    <>
      {activeSession ? <h3>You're already logged in!</h3> : (
        <div>
          <AuthenticationForm />
        </div>
      )}
    </>
  );
}
