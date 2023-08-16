import { epoch } from "./utils.ts";
import { sendMetric } from "./metrics.ts";

// Store a newly signed-up user.
// This information will be used to populate a profile. It will include
// the user's ID, preferred name, email address, and payment status.
const addUser = async (
  userId: string,
  email: string,
  preferredName: string,
): [number, object] => {
  let [statusCode, response] = [201, {}]; // Sane default/starting point.
  const profile = {
    email: email,
    preferredName: preferredName,
    createdAt: epoch(),
    paymentStatus: "free",
  };

  const kv = await Deno.openKv();
  try {
    await kv.set(["users", userId, "profile"], profile);
    response = { userId: userId, message: "User added successfully" };
  } catch (err) {
    statusCode = 500;
    response.message = err;
    console.log(`Failed to add user for userId ${userId}: ${err}`);
  } finally {
    kv.close();
  }

  return [statusCode, response];
};

const getUser = async (userId: string) => {
  let profile;
  const kv = await Deno.openKv();
  const entry = await kv.get(["users", userId, "profile"]);
  profile = entry.value;
  kv.close();
  return profile;
};

// Track the last time a user logged in.
const updateLastLogin = async (userId: string): void => {
  const kv = await Deno.openKv();
  try {
    await kv.set(["users", userId, "lastLogin"], epoch());
    console.log(`Last login updated successfully for ${userId}`);
  } catch (err) {
    console.log(`Failed to update last login for userId ${userId}: ${err}`);
  } finally {
    kv.close();
  }
};

const getRoles = async (userId: string) => {
  const kv = await Deno.openKv();
  const entries = await kv.list({ prefix: [userId, "roles"] }); // KvListIterator
  const roles = [];
  for await (const entry of entries) {
    /* Example of a role entry.
    {
      key: [ "1", "roles", 4 ],
      value: {
        title: "Director of Engineering",
        company: "Coca-Cola",
        jobPostingUrl: "",
        description: "",
        "created-at": "",
        referralContact: "",
        "recruiter-contact": "",
        id: 4
      },
      versionstamp: "00000000000000040000"
    }
    */
    //await kv.delete(entry.key); // Only used when testing!!!
    roles.push(entry.value);
  }
  kv.close();
  return roles;
};

// Return all notes associated with a role.
const getNotes = async (userId: string, roleId: number) => {
  const kv = await Deno.openKv();
  const entries = await kv.list({ prefix: [userId, "notes", roleId] });
  const notes = [];
  for await (const entry of entries) {
    /*
    {
      key: [ "1", "notes", 7, 1 ],
      value: { "created-at": 1690051859404, message: "Added role.", id: 1 },
      versionstamp: "000000000000005d0000"
    }
     */
    //await kv.delete(entry.key); // Only used in testing!!
    notes.push(entry.value);
  }
  kv.close();
  return notes;
};

// Look up a single role.
// Returns an HTTP status code and an object with helpful context.
// FIXME: Return hypermedia instead of JSON?
const getRole = async (userId: string, roleId: number): [number, object] => {
  const kv = await Deno.openKv();
  const role = await kv.get([userId, "roles", roleId]);
  kv.close();
  if (role) {
    return [200, role.value];
  } else {
    return [404, { message: "Role not found." }];
  }
};

// Returns an HTTP status code and an object with helpful context.
const addRole = async (userId: string, role): [number, object] => {
  const roles = await getRoles(userId);
  const roleIds = roles.map((r) => r.id);
  const desc = (a, b) => {
    return b - a;
  };
  let nextId;
  if (roleIds.length > 0) {
    nextId = roleIds.sort(desc)[0] + 1;
  } else {
    nextId = 1;
  }
  role.id = nextId;
  if ("created-at" in role && role["created-at"].length == 0) {
    // Set it by default.
    role["created-at"] = epoch();
  } else {
    // The value of "created-at" should be a number but the form passed it
    // as a string.
    role["created-at"] = parseInt(role["created-at"]);
  }
  // FIXME: I'm being lazy with this copypasta.
  if ("updated-at" in role && role["updated-at"].length == 0) {
    // Set it by default.
    role["updated-at"] = epoch();
  } else {
    // The value of "updated-at" should be a number but the form passed it
    // as a string.
    role["updated-at"] = parseInt(role["updated-at"]);
  }
  let [statusCode, response] = [201, {}]; // Sane default/starting point.
  const kv = await Deno.openKv();
  try {
    // The combination of user ID and role ID will be the key.
    await kv.set([userId, "roles", role.id], role);
    sendMetric("roleAdded");
    response = { roleId: nextId, message: "Role added successfully" };
  } catch (err) {
    statusCode = 500;
    response.message = err;
    console.log(`Failed to add role for userId ${userId}: ${err}`);
  } finally {
    kv.close();
  }

  // First note!
  const note = {
    "created-at": role["created-at"],
    message: "Added role.",
  };
  await addNote(userId, role.id, note);

  return [statusCode, response];
};

// Given a string, generates a note object.
const makeNote = (message: string) => {
  return {
    "created-at": epoch(),
    message: message,
  };
};

// Update a record representing the last time a role had a note added.
// This is sort of like a "join" table that helps us avoid querying all notes
// for every role just to find the last activity.
const updateNoteActivity = async (
  userId: string,
  roleId: number,
  epoch: number,
) => {
  const kv = await Deno.openKv();
  try {
    await kv.set([userId, "noteActivity", roleId], epoch);
  } catch (err) {
    console.log(
      `Failed to update note activity on role ${roleId} for userId ${userId}: ${err}`,
    );
  } finally {
    kv.close();
  }
};

// Fetches all note activity values. Returns an object whose values represent
// the last activity timestamp for a role's notes, keyed by role ID.
const getNoteActivity = async (userId: string) => {
  const kv = await Deno.openKv();
  const activity = {};
  const entries = await kv.list({ prefix: [userId, "noteActivity"] });
  for await (const entry of entries) {
    const roleId = entry.key.slice(-1); // roleId is the last part of the key.
    activity[roleId] = entry.value;
  }
  kv.close();
  return activity;
};

const addNote = async (
  userId: string,
  roleId: number,
  note,
): [number, object] => {
  const notes = await getNotes(userId, roleId);
  const noteIds = notes.map((r) => r.id);
  const desc = (a, b) => {
    return b - a;
  };
  let nextId;
  if (noteIds.length > 0) {
    nextId = noteIds.sort(desc)[0] + 1;
  } else {
    nextId = 1;
  }
  note.id = nextId;
  if (note["created-at"].length == 0) {
    // Set it by default.
    note["created-at"] = epoch();
  } else {
    // Should be a number but the form passed it as a string.
    note["created-at"] = parseInt(note["created-at"]);
  }
  let [statusCode, response] = [201, {}]; // Sane default/starting point.
  const kv = await Deno.openKv();
  try {
    await kv.set([userId, "notes", roleId, note.id], note);
    sendMetric("noteAdded");
    response = { noteId: nextId, message: "Note added successfully" };
  } catch (err) {
    statusCode = 500;
    response.message = err;
    console.log(
      `Failed to add note to role ${roleId} for userId ${userId}: ${err}`,
    );
  } finally {
    kv.close();
  }
  await updateNoteActivity(userId, roleId, epoch());
  return [statusCode, response];
};

const friendlyRoleProperties = {
  title: "Title",
  company: "Company",
  status: "Status",
  "jobPostingUrl": "Job Posting",
  description: "Description",
  referralContact: "Referral Contact",
  "recruiter-contact": "Recruiter Contact",
};
// A very naive solution to finding differences between objects.
// Returns an array of strings describing what has changed.
const roleChanges = (existingRole, newRole) => {
  const changes = [];
  for (const key of Object.keys(existingRole)) {
    if (existingRole[key] !== newRole[key]) {
      // Never directly changed by form inputs.
      if (key == "created-at" || key == "updated-at") {
        continue;
      }
      changes.push(
        `${friendlyRoleProperties[key]} changed from "${
          existingRole[key]
        }" to "${newRole[key]}"`,
      );
    }
  }
  return changes;
};

const updateRole = async (
  userId: string,
  roleId: number,
  role,
): [number, object] => {
  const [getRoleStatusCode, existingRole] = await getRole(userId, roleId);
  // The ID is not part of the form data so we add it back, here.
  role.id = roleId;
  let [statusCode, response] = [200, {}]; // Sane default/starting point.
  if (getRoleStatusCode == 200) {
    const changes = roleChanges(existingRole, role);
    if (changes.length > 0) {
      // FIXME: Test for failure.
      for (const change of changes) {
        const note = makeNote(change);
        await addNote(userId, roleId, note);
      }
    }
    // Merge the updated role properties with the existing role.
    // This ensures the "created-at" property is retained.
    const updatedRole = Object.assign(existingRole, role);
    updatedRole["updated-at"] = epoch();
    const kv = await Deno.openKv();
    try {
      // Replace the role entirely.
      await kv.set([userId, "roles", roleId], updatedRole);
      sendMetric("roleUpdated");
      response = { roleId: roleId, message: "Role updated successfully" };
    } catch (err) {
      statusCode = 500;
      response.message = err;
      console.log(`Failed to update role for userId ${userId}: ${err}`);
    } finally {
      kv.close();
    }
  }
  return [statusCode, response];
};

// TODO: Add getRole(userId, roleId). Pair with /routes/role/[id].tsx
export {
  addNote,
  addRole,
  addUser,
  getNoteActivity,
  getNotes,
  getRole,
  getRoles,
  getUser,
  makeNote,
  updateLastLogin,
  updateRole,
};
