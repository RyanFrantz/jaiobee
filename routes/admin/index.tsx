import { Handlers } from "$fresh/server.ts";
import { getUserProfiles } from "../../lib/store.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const users = await getUserProfiles();
    console.log(users);
    return ctx.render();
  },
};

export default function AdminHome(props) {
  return (
    <>
      Admin
    </>
  );
}
