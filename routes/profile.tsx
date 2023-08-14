import { Handlers, PageProps } from "$fresh/server.ts";
import UserProfile from "../components/UserProfile.tsx";
import { getUser } from "../lib/store.ts";
import { sendMetric } from "../lib/metrics.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const userId = ctx.state.userId;
    const profile = await getUser(userId);
    sendMetric("profileViewed");
    return await ctx.render({ profile });
  },
};

export default function Profile(props: PageProps) {
  const { profile } = props.data;
  return (
    <>
      <div id="profile-container">
        <UserProfile profile={profile} />
      </div>
    </>
  );
}
