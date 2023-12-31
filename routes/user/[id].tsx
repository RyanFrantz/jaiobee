import { Handlers } from "$fresh/server.ts";
import { getContacts, getRoles, getUser } from "../../lib/store.ts";
import UserProfile from "../../components/UserProfile.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    // Grab the first part of the pathname to use as input for a user ID.
    // NOTE: This is the user ID we need to look up, not the ID of the user
    // _doing_ the lookup.
    const userId = url.pathname.split("/user/")[1];
    const contacts = await getContacts(userId);
    const roles = await getRoles(userId);
    const profile = await getUser(userId);
    const { dateTimeFormat } = ctx.state; // Of the user doing the lookup.
    const props = {
      dateTimeFormat,
      numContacts: contacts.length,
      numRoles: roles.length,
      profile,
    };
    return ctx.render(props);
  },
};

export default function User(props) {
  const { dateTimeFormat, numContacts, numRoles, profile } = props.data;
  return (
    <div id="profile-container">
      <UserProfile
        profile={profile}
        dateTimeFormat={dateTimeFormat}
        numContacts={numContacts}
        numRoles={numRoles}
      />
    </div>
  );
}
