import { Handlers } from "$fresh/server.ts";
import RoleDetails from "../../components/RoleDetails.tsx";
import SaveRoleButton from "../../components/SaveRoleButton.tsx";
import { addRole } from "../../lib/store.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
  async POST(req, _ctx) {
    const formData = await req.formData();
    const role = {};
    for (const [key, value] of formData.entries()) {
        role[key] = value;
    }
    const userId = "1"; // Hard-coding for testing.
    const [statusCode, response] = await addRole(userId, role);

    // TODO: If response.statusCode == 201, then 303 to
    // `/role/${response.roleId}`
    const headers = new Headers();
    // Redirect to the new role page.
    headers.set("location", "/roles");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function NewRole() {
  return (
    <form method="post" class="mt-1">
      <SaveRoleButton />
      <RoleDetails />
    </form>
  );
}
