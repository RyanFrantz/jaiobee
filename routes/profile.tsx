import { Handlers, PageProps } from "$fresh/server.ts";
import UserProfile from "../components/UserProfile.tsx";
import { getContacts, getRoles, getUser } from "../lib/store.ts";
import { sendMetric } from "../lib/metrics.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { dateTimeFormat, userId } = ctx.state;
    const profile = await getUser(userId);
    const contacts = await getContacts(userId);
    const roles = await getRoles(userId);
    sendMetric("profileViewed");
    const props = {
      dateTimeFormat,
      numContacts: contacts.length,
      numRoles: roles.length,
      profile,
    };
    return await ctx.render(props);
  },
};

export default function Profile(props: PageProps) {
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
