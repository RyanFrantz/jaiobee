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
    await kv.set(["users", "profile", userId], profile);
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
  const entry = await kv.get(["users", "profile", userId]);
  profile = entry.value;
  kv.close();
  return profile;
};

// Test if a user has been assigned the "admin" role.
const isAdmin = async (userId: string): boolean => {
  const kv = await Deno.openKv();
  const entry = await kv.get(["roles", "admin"]);
  const admins: Array<string> = entry.value || [];
  kv.close();
  return admins.includes(userId);
};

// WARN: This is a privileged operation. Any code using this MUST first
// validate the user is an admin (see `isAdmin()`).
const getUserProfiles = async () => {
  const kv = await Deno.openKv();
  const profiles = [];
  const entries = await kv.list({ prefix: ["users", "profile"] });
  for await (const entry of entries) {
    const userId = entry.key[2];
    const profile = {...entry.value, id: userId};
    profiles.push(profile);
  }
  kv.close();
  return profiles;
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
        createdAt: "",
        referralContact: "",
        recruiterContact: "",
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
      value: { createdAt: 1690051859404, message: "Added role.", id: 1 },
      versionstamp: "000000000000005d0000"
    }
     */
    //await kv.delete(entry.key); // Only used in testing!!
    notes.push(entry.value);
  }
  kv.close();
  return notes;
};

const getContactNotes = async (userId: string, contactId: number) => {
  const kv = await Deno.openKv();
  const entries = await kv.list({ prefix: [userId, "contactNotes", contactId] });
  const notes = [];
  for await (const entry of entries) {
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

// Given a role ID and boolean value, set a role's archive status accordingly.
const setRoleArchive = async (userId: string, roleId: number, isArchived: boolean) => {
  const kv = await Deno.openKv();
  await kv.set([userId, "roleArchive", roleId], isArchived);
  kv.close();
};

// Given a role ID returns a role's archive status.
const getRoleArchive = async (userId: string, roleId: number) => {
  const kv = await Deno.openKv();
  const isArchived = await kv.get([userId, "roleArchive", roleId]);
  kv.close();
  return isArchived.value;
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
  if ("createdAt" in role && role.createdAt.length == 0) {
    // Set it by default.
    role.createdAt = epoch();
  } else {
    // The value of "createdAt" should be a number but the form passed it
    // as a string.
    role.createdAt = parseInt(role.createdAt);
  }
  // FIXME: I'm being lazy with this copypasta.
  if ("updatedAt" in role && role.updatedAt.length == 0) {
    // Set it by default.
    role.updatedAt = epoch();
  } else {
    // The value of "updatedAt" should be a number but the form passed it
    // as a string.
    role.updatedAt = parseInt(role.updatedAt);
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
    createdAt: role.createdAt,
    message: "Added role.",
  };
  await addNote(userId, role.id, note);

  return [statusCode, response];
};

// Given a string, generates a note object.
const makeNote = (message: string) => {
  return {
    createdAt: epoch(),
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

const updateContactNoteActivity = async (
  userId: string,
  contactId: number,
  epoch: number,
) => {
  const kv = await Deno.openKv();
  try {
    await kv.set([userId, "contactNoteActivity", contactId], epoch);
  } catch (err) {
    console.log(
      `Failed to update contact note activity on role ${contactId} for userId ${userId}: ${err}`,
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

const getContactNoteActivity = async (userId: string) => {
  const kv = await Deno.openKv();
  const activity = {};
  const entries = await kv.list({ prefix: [userId, "contactNoteActivity"] });
  for await (const entry of entries) {
    const contactId = entry.key.slice(-1); // contactId is the last part of the key.
    activity[contactId] = entry.value;
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
  if (note.createdAt.length == 0) {
    // Set it by default.
    note.createdAt = epoch();
  } else {
    // Should be a number but the form passed it as a string.
    note.createdAt = parseInt(note.createdAt);
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
  recruiterContact: "Recruiter Contact",
};
// A very naive solution to finding differences between objects.
// Returns an array of strings describing what has changed.
const roleChanges = (existingRole, newRole) => {
  const changes = [];
  for (const key of Object.keys(existingRole)) {
    if (existingRole[key] !== newRole[key]) {
      // Never directly changed by form inputs.
      if (key == "createdAt" || key == "updatedAt") {
        continue;
      }
      if (key == "referralContact" || key == "recruiterContact") {
        const partialMessage = roleContactChanges(existingRole[key], newRole[key]);
        changes.push(
          `${friendlyRoleProperties[key]} changed from ${partialMessage}`
        );
      } else {
        changes.push(
          `${friendlyRoleProperties[key]} changed from "${
            existingRole[key]
          }" to "${newRole[key]}"`,
        );
      }
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
    // This ensures the "createdAt" property is retained.
    const updatedRole = Object.assign(existingRole, role);
    updatedRole.updatedAt = epoch();
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

const getContacts = async (userId: string) => {
  const kv = await Deno.openKv();
  const entries = await kv.list({ prefix: [userId, "contacts"] });
  const contacts = [];
  for await (const entry of entries) {
    contacts.push(entry.value);
  }
  kv.close();
  return contacts;
};

const getContact = async (userId: string, contactId: number): [number, object] => {
  const kv = await Deno.openKv();
  const contact = await kv.get([userId, "contacts", contactId]);
  kv.close();
  if (contact) {
    return [200, contact.value];
  } else {
    return [404, { message: "Contact not found." }];
  }
};

const addContactNote = async (
  userId: string,
  contactId: number,
  note,
): [number, object] => {
  const notes = await getContactNotes(userId, contactId);
  const noteIds = notes.map((n) => n.id);
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
  if (note.createdAt.length == 0) {
    // Set it by default.
    note.createdAt = epoch();
  } else {
    // Should be a number but the form passed it as a string.
    note.createdAt = parseInt(note.createdAt);
  }
  let [statusCode, response] = [201, {}]; // Sane default/starting point.
  const kv = await Deno.openKv();
  try {
    await kv.set([userId, "contactNotes", contactId, note.id], note);
    sendMetric("contactNoteAdded");
    response = { noteId: nextId, message: "Contact note added successfully" };
  } catch (err) {
    statusCode = 500;
    response.message = err;
    console.log(
      `Failed to add note to contact ${contactId} for userId ${userId}: ${err}`,
    );
  } finally {
    kv.close();
  }
  await updateContactNoteActivity(userId, contactId, epoch());
  return [statusCode, response];
};

const addContact = async (userId: string, contact): [number, object] => {
  const contacts = await getContacts(userId);
  const contactIds = contacts.map((c) => c.id);
  const desc = (a, b) => {
    return b - a;
  };
  let nextId;
  if (contactIds.length > 0) {
    nextId = contactIds.sort(desc)[0] + 1;
  } else {
    nextId = 1;
  }
  contact.id = nextId;
  if ("createdAt" in contact && contact.createdAt.length == 0) {
    // Set it by default.
    contact.createdAt = epoch();
  } else {
    // The value of "createdAt" should be a number but the form passed it
    // as a string.
    contact.createdAt = parseInt(contact.createdAt);
  }
  // FIXME: I'm being lazy with this copypasta.
  if ("updatedAt" in contact && contact.updatedAt.length == 0) {
    // Set it by default.
    contact.updatedAt = epoch();
  } else {
    // The value of "updatedAt" should be a number but the form passed it
    // as a string.
    contact.updatedAt = parseInt(contact.updatedAt);
  }
  let [statusCode, response] = [201, {}]; // Sane default/starting point.
  const kv = await Deno.openKv();
  try {
    // The combination of user ID and role ID will be the key.
    await kv.set([userId, "contacts", contact.id], contact);
    sendMetric("contactAdded");
    response = { contactId: nextId, message: "Contact added successfully" };
  } catch (err) {
    statusCode = 500;
    response.message = err;
    console.log(`Failed to add contact for userId ${userId}: ${err}`);
  } finally {
    kv.close();
  }

  // First note!
  const note = {
    createdAt: contact.createdAt,
    message: "Added contact.",
  };
  await addContactNote(userId, contact.id, note);

  return [statusCode, response];
};

// A very naive solution to finding differences between objects.
// Returns an array of strings describing what has changed.
const contactChanges = (existingContact, newContact) => {
  const changes = [];
  for (const key of Object.keys(existingContact)) {
    if (existingContact[key] !== newContact[key]) {
      // Never directly changed by form inputs.
      if (key == "createdAt" || key == "updatedAt") {
        continue;
      }
      changes.push(
        `${key} changed from "${existingContact[key]}" to "${newContact[key]}"`,
      );
    }
  }
  return changes;
};

// Returns a message describing contact changes within the context of a role.
const roleContactChanges = (existingContact, newContact): string => {
  // New contacts are _always_ stringified JSON objects.
  let nc;
  try {
    nc = JSON.parse(newContact);
  } catch {
    nc = {name: ""}
  }
  // Presumes the value is a stringified JSON object.
  if (existingContact.length > 0) {
    const ec = JSON.parse(existingContact);
    return `"${ec.name}" to "${nc.name}"`;
  }
  return `"" to ${nc.name}`;
};

const updateContact = async (
  userId: string,
  contactId: number,
  contact,
): [number, object] => {
  const [getContactStatusCode, existingContact] = await getContact(userId, contactId);
  // The ID is not part of the form data so we add it back, here.
  contact.id = contactId;
  let [statusCode, response] = [200, {}]; // Sane default/starting point.
  if (getContactStatusCode == 200) {
    const changes = contactChanges(existingContact, contact);
    if (changes.length > 0) {
      // FIXME: Test for failure.
      for (const change of changes) {
        const note = makeNote(change);
        await addContactNote(userId, contactId, note);
      }
    }
    // Merge the updated contact properties with the existing contact.
    // This ensures the "createdAt" property is retained.
    const updatedContact = Object.assign(existingContact, contact);
    updatedContact.updatedAt = epoch();
    const kv = await Deno.openKv();
    try {
      // Replace the role entirely.
      await kv.set([userId, "contacts", contactId], updatedContact);
      sendMetric("contactUpdated");
      response = { contactId: contactId, message: "Contact updated successfully" };
    } catch (err) {
      statusCode = 500;
      response.message = err;
      console.log(`Failed to update contact for userId ${userId}: ${err}`);
    } finally {
      kv.close();
    }
  }
  return [statusCode, response];
};

export {
  addContact,
  addContactNote,
  addNote,
  addRole,
  addUser,
  getContact,
  getContactNotes,
  getContacts,
  getContactNoteActivity,
  getNoteActivity,
  getNotes,
  getRole,
  getRoleArchive,
  getRoles,
  getUser,
  getUserProfiles,
  isAdmin,
  makeNote,
  setRoleArchive,
  updateContact,
  updateLastLogin,
  updateRole,
};
