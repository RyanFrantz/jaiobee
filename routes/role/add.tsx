import { Handlers } from "$fresh/server.ts";
import SaveRoleButton from "../../components/SaveRoleButton.tsx";
import RoleForm from "../../components/RoleForm.tsx";
import { addRole } from "../../lib/store.ts";
import { epoch } from "../../lib/utils.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const formData = await req.formData();
    const role = {};
    for (const [key, value] of formData.entries()) {
      role[key] = value;
    }
    const userId = ctx.state.userId;
    const [statusCode, response] = await addRole(userId, role);

    const headers = new Headers();
    // Redirect to the new role page.
    if (statusCode == 201) {
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

export default function AddRole() {
  // The user is adding the role for the first time so we'll pre-populate the
  // important bits.
  const now = epoch();
  const role = { createdAt: now, "updated-at": now };
  return (
    <div id="role-container">
      <SaveRoleButton />
      <RoleForm role={role} action="add" />
    </div>
  );
}
