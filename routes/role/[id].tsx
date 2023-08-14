import { Handlers } from "$fresh/server.ts";
import EditRoleButton from "../../components/EditRoleButton.tsx";
import RoleDetails from "../../components/RoleDetails.tsx";
import { getRole, updateRole } from "../../lib/store.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    // Grab the first part of the pathname to use as input for a role ID.
    const roleId = Number(url.pathname.split("/role/")[1]);
    const userId = ctx.state.userId;
    let [statusCode, role] = await getRole(userId, roleId);
    if (statusCode !== 200) {
      role = {};
    }
    const props = { ...ctx.state, role: role, roleId: roleId };
    return ctx.render(props);
  },

  // The user clicked 'Save Role'.
  async POST(req, ctx) {
    const url = new URL(req.url);
    const formData = await req.formData();
    const role = {};
    for (const [key, value] of formData.entries()) {
      role[key] = value;
    }
    const roleId = Number(url.pathname.split("/role/")[1]);
    const userId = ctx.state.userId;
    const [statusCode, response] = await updateRole(userId, roleId, role);

    const headers = new Headers();
    // Redirect to the role page on successful update.
    if (statusCode == 200) {
      const { roleId } = response;
      headers.set("location", `/role/${roleId}`);
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    }

    return new Response(null, {
      status: 404, // blanket response, for now
    });
  },
};

export default function Role(props) {
  const { role, roleId } = props.data;
  return (
    <>
      <div id="role-container">
        <EditRoleButton roleId={roleId} />
        <RoleDetails role={role} />
      </div>
      <div
        id="note-container"
        class="mt-4"
        hx-get={"/role/" + roleId + "/notes"}
        hx-trigger="load"
        hx-target="#note-container"
        hx-swap="outerHTML"
      >
      </div>
    </>
  );
}
