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
      status: 404 // blanket response, for now
    });
  },
};

export default function AddRole() {
  return (
    <form method="post" class="mt-1">
      <SaveRoleButton />
      <RoleDetails role={{}}/>
    </form>
  );
}
