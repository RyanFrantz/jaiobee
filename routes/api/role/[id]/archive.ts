import { Handlers } from "$fresh/server.ts";
import { getRoleArchive, setRoleArchive } from "../../../../lib/store.ts";

// Generate a partial document describing the archive status of a role.
const checkbox = async ({userId = "", url = new URL(), toggle = false} = {}) => {
  // /api/role/4/archive
  //           ^
  const roleId = url.pathname.split('/')[3];
  let isArchived = await getRoleArchive(userId, roleId);
  if (toggle) {
    isArchived = !isArchived;
    await setRoleArchive(userId, roleId, isArchived);
  }
  const checked = isArchived ? "checked": "";
  const archiveCheckbox = `
    <div
      id="archiveStatus"
      hx-put="${url.pathname}"
      hx-target="#archiveStatus"
      hx-swap="outerHTML"
    >
      <label for="archiveRole" class="text-sm pr-1">
        Archive Role?
      </label>
      <input type="checkbox" id="archiveRole" ${checked}/>
    </div>`;
  return archiveCheckbox;
};

export const handler: Handlers = {
  // Return a resource describing the current state of the archive value.
  async GET(req, ctx) {
    const { userId } = ctx.state;
    const url = new URL(req.url);

    return new Response(await checkbox({userId: userId, url: url}), {
      status: 200,
    });
  },
  // Toggle the archive state and return the updated resource.
  async PUT(req, ctx) {
    const { userId } = ctx.state;
    // Return the resource with its checked value toggled to the opposite of
    // what it was previously.
    const url = new URL(req.url);
    return new Response(await checkbox({userId: userId, url: url, toggle: true}), {
      status: 200,
    });
  },
};
