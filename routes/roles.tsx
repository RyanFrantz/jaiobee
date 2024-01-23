import { Handlers, PageProps } from "$fresh/server.ts";
// NOTE to self: Don't name components the same as routes; it creates an
// infinite processing/rendering loop that Deno eventually bails from.
// Hence RoleTable rather than Roles below.
import RoleTable from "../components/RoleTable.tsx";
import AddRoleButton from "../components/AddRoleButton.tsx";
import { getNoteActivity, getRoles, getRoleArchive } from "../lib/store.ts";
import ToggleArchive from "../islands/ToggleArchive.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { dateTimeFormat, userId } = ctx.state;
    const roles = await getRoles(userId);
    for (const role of roles) {
      const isArchived = await getRoleArchive(userId, role.id);
      role.isArchived = isArchived ? "yes": "no";
    }
    const noteActivity = await getNoteActivity(userId);
    return await ctx.render({ roles, noteActivity, dateTimeFormat });
  },
};

export default function Roles(props: PageProps) {
  const { roles, noteActivity, dateTimeFormat } = props.data;
  return (
    <>
      <div id="roles-container">
        <AddRoleButton />
        <ToggleArchive />
        <RoleTable
          roles={roles}
          noteActivity={noteActivity}
          dateTimeFormat={dateTimeFormat}
        />
      </div>
    </>
  );
}
