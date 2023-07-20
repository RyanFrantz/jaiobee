import { Handlers } from "$fresh/server.ts";
import { render } from "https://esm.sh/preact-render-to-string@6.2.0";
import { getRole } from "../../../lib/store.ts";
import EditButtonRow from "../../../components/EditButtonRow.tsx";
import RoleForm from "../../../components/RoleForm.tsx";

// Returns hypermedia that will replace a container from whence it was called.
export const handler: Handlers = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    // /role/8/edit
    //       ^
    const roleId =  Number(url.pathname.split("/")[2]);
    const userId = "1"; // Hard-coded for testing.
    let [statusCode, role] = await getRole(userId, roleId);
    if ( statusCode !== 200 ) {
      role = {};
    }
    // Let's give hypermedia a whirl, here.
    const body = render(
      <div id="role-container">
        <EditButtonRow roleId={roleId} />
        <RoleForm role={role} action="edit"/>
      </div>
    );
    const headers = new Headers();
    headers.set("content-type", "text/html");
    return new Response(
      body,
      {
        headers: headers
      }
    );
    
  },
};
