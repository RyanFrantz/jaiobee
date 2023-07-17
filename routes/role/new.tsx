import { Handlers } from "$fresh/server.ts";
import RoleDetails from "../../components/RoleDetails.tsx";
import SaveRoleButton from "../../components/SaveRoleButton.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
  async POST(req, _ctx) {
    const formData = await req.formData();
    console.log(formData);
    console.log(formData.get("title"));

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
