import { Handlers } from "$fresh/server.ts";
import EditRoleButton from "../../components/EditRoleButton.tsx";
import RoleDetails from "../../components/RoleDetails.tsx";
import { getRole } from "../../lib/store.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    // Grab the first part of the pathname to use as input for a role ID.
    const roleId = Number(url.pathname.split("/role/")[1]);
    const userId = "1"; // Hard-coded for testing.
    let [statusCode, role] = await getRole(userId, roleId);
    if ( statusCode !== 200 ) {
      role = {};
    }
    const props = {...ctx.state, role: role};
    return ctx.render(props);
  },
};

export default function Role(props) {
  const { role } = props.data;
  return (
    <div id="role-container">
      <EditRoleButton />
      <RoleDetails role={role}/>
    </div>
  );
}
