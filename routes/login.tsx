import AuthenticationForm from "../components/AuthenticationForm.tsx";
import { Handlers } from "$fresh/server.ts";
import { isAuthenticated } from "../lib/utils.ts";
import AlreadyLoggedIn from "../components/AlreadyLoggedIn.tsx";

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
      {isAuthenticated ? <AlreadyLoggedIn /> : (
        <div>
          <AuthenticationForm />
        </div>
      )}
    </>
  );
}
