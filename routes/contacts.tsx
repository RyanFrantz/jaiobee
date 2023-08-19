import { Handlers, PageProps } from "$fresh/server.ts";

// TODO: Build support for storing and retrieving contacts.
export const handler: Handlers = {
  async GET(_req, ctx) {
    const userId = ctx.state.userId;
    return await ctx.render({ userId });
  },
};

export default function Profile(props: PageProps) {
  const { userId } = props.data;
  return (
    <>
      <div id="contacts-container">
      Coming soon!
      </div>
    </>
  );
}
