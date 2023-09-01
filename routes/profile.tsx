import { Handlers, PageProps } from "$fresh/server.ts";
import UserProfile from "../components/UserProfile.tsx";
import { getUser } from "../lib/store.ts";
import { sendMetric } from "../lib/metrics.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { dateTimeFormat, userId } = ctx.state;
    const profile = await getUser(userId);
    sendMetric("profileViewed");
    return await ctx.render({ profile, dateTimeFormat });
  },
};

export default function Profile(props: PageProps) {
  const { profile, dateTimeFormat } = props.data;
  return (
    <div id="profile-container">
      <UserProfile profile={profile} dateTimeFormat={dateTimeFormat} />
    </div>
  );
}
