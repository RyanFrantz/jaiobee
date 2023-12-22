import { Handlers } from "$fresh/server.ts";

// Temp state, for testing.
const store = {archived: true};

// Generate a partial document describing the archive status of a role.
const checkbox = ({url = new URL(), toggle = false} = {}) => {
  if (toggle) {
    store.archived = !store.archived;
  }
  // /api/role/4/archive
  //           ^
  const roleId = url.pathname.split('/')[3];
  // TODO: use roleId to look up role status.
  const checked = store.archived ? "checked": "";
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
  async GET(req) {
    const url = new URL(req.url);
    const role = {id: 1};

    return new Response(checkbox({url: url}), {
      status: 200,
    });
  },
  // Toggle the archive state and return the updated resource.
  async PUT(req) {
    // Return the resource with its checked value toggled to the opposite of
    // what it was previously.
    const url = new URL(req.url);
    return new Response(checkbox({url: url, toggle: true}), {
      status: 200,
    });
  },
};
