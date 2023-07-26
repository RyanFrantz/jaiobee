import { Handlers, PageProps } from "$fresh/server.ts";
// NOTE to self: Don't name components the same as routes; it creates an
// infinite processing/rendering loop that Deno eventually bails from.
// Hence RoleTable rather than Roles below.
import RoleTable from "../components/RoleTable.tsx";
import AddRoleButton from "../components/AddRoleButton.tsx";
import { getRoles, getNoteActivity } from "../lib/store.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    // TODO: Look up roles.
    const userId = "1"; // Hard-coded for testing.
    const roles = await getRoles(userId);
    const noteActivity = await getNoteActivity(userId);
    return await ctx.render({roles, noteActivity});
  },
};

export default function Roles(props: PageProps) {
  const { roles, noteActivity } = props.data;
  return (
    <>
    <div id="roles-container">
      <AddRoleButton />
      <RoleTable roles={roles} noteActivity={noteActivity} />
    </div>
    </>
  );
}
