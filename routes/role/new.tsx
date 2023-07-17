import { Handlers } from "$fresh/server.ts";
import RoleDetails from "../../components/RoleDetails.tsx";

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
	    <div class="flex justify-end m-2">
	      <button
          type="submit"
          class="px-2 rounded bg-sky-500 hover:bg-sky-600 text-white text-sm"
        >
	      Save Role
	      </button>
	    </div>
      <RoleDetails />
    </form>
  );
}
