import { epoch } from "./utils.ts";

const getRoles = async (userId: string) => {
  const kv = await Deno.openKv();
  const entries = await kv.list({prefix: [userId, "roles"]}); // KvListIterator
  const roles = [];
  for await (const entry of entries) {
    /* Example of a role entry.
    {
      key: [ "1", "roles", 4 ],
      value: {
        title: "Director of Engineering",
        company: "Coca-Cola",
        "job-posting-url": "",
        description: "",
        "date-added": "",
        "referral-contact": "",
        "recruiter-contact": "",
        id: 4
      },
      versionstamp: "00000000000000040000"
    }
    */
    //kv.delete(entry.key); // Only used when testing!!!
    roles.push(entry.value);
  }
  kv.close();
  return roles;
};

// Returns an HTTP status code and an object with helpful context.
const addRole = async (userId: string, role): [number, object] => {
  const _roles = await getRoles(userId);
  const roleIds = _roles.map((r) => r.id);
  const desc = (a,b) => {
    return b - a;
  };
  let nextId;
  if (roleIds.length > 0) {
    nextId = roleIds.sort(desc)[0] + 1;
  } else {
    nextId = 1;
  }
  role.id = nextId;
  if (role["date-added"].length == 0) {
    role["date-added"] = epoch();
  }
  let [ statusCode, response ] = [ 201, {} ]; // Sane default/starting point.
  const kv = await Deno.openKv();
  try {
    // The combination of user ID and role ID will be the key.
    await kv.set([userId, "roles", role.id], role);
    response = { roleId: nextId, message: "Role added successfully" };
  } catch (err) {
      statusCode = 500;
      response.message = err;
      console.log(`Failed to add role for userId ${userId}: ${err}`);
  } finally {
    kv.close();
  }
  return [statusCode, response];
};

// TODO: Add getRole(userId, roleId). Pair with /routes/role/[id].tsx
export { addRole, getRoles };
