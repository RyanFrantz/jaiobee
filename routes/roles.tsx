import { Handlers, PageProps } from "$fresh/server.ts";
// NOTE to self: Don't name components the same as routes; it creates an
// infinite processing/rendering loop that Deno eventually bails from.
// Hence RoleTable rather than Roles below.
import RoleTable from "../components/RoleTable.tsx";
import AddRoleButton from "../components/AddRoleButton.tsx";
import { getNoteActivity, getRoles } from "../lib/store.ts";
import { useUserContext } from "../components/UserContextProvider.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const userId = ctx.state.userId;
    const roles = await getRoles(userId);
    const noteActivity = await getNoteActivity(userId);
    return await ctx.render({ roles, noteActivity });
  },
};

export default function Roles(props: PageProps) {
  const { timeZone } = useUserContext();
  console.log("ROLES timeZone:", timeZone)
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
