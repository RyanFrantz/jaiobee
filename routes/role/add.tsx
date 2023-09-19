import { Handlers, PageProps } from "$fresh/server.ts";
import SaveRoleButton from "../../components/SaveRoleButton.tsx";
import RoleForm from "../../components/RoleForm.tsx";
import { addRole } from "../../lib/store.ts";
import { epoch } from "../../lib/utils.ts";
import { getContacts } from "../../lib/store.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const userId = ctx.state.userId;
    // IDEA: Since userId is available in a cookie, use htmx and an API route
    // to return the contacts as a set of select options.
    const contacts = await getContacts(userId);
    return await ctx.render({ contacts });
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

export default function AddRole(props: PageProps) {
  const { contacts } = props.data;
  // The user is adding the role for the first time so we'll pre-populate the
  // important bits.
  const now = epoch();
  const role = { createdAt: now, updatedAt: now };
  return (
    <div id="role-container">
      <SaveRoleButton />
      <RoleForm role={role} contacts={contacts} action="add" />
    </div>
  );
}
