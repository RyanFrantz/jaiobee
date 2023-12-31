import { Handlers } from "$fresh/server.ts";
import { getUserProfiles } from "../../lib/store.ts";
import UserProfileTable from "../../components/UserProfileTable.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const userProfiles = await getUserProfiles();
    const { dateTimeFormat }= ctx.state;
    return ctx.render({dateTimeFormat, userProfiles});
  },
};

export default function AdminHome(props) {
  const { dateTimeFormat, userProfiles } = props.data;
  return (
    <>
      <div class="px-2 text-sm flex justify-center">
        All Users
      </div>
      <UserProfileTable
        userProfiles={userProfiles}
        dateTimeFormat={dateTimeFormat}
      />
    </>
  );
}
