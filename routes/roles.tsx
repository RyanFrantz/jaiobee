import { Handlers, PageProps } from "$fresh/server.ts";
// NOTE to self: Don't name components the same as routes; it creates an
// infinite processing/rendering loop that Deno eventually bails from.
// Hence RoleList rather than Roles below.
//import RoleList from "../components/RoleList.tsx";
import RoleTable from "../components/RoleTable.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    // TODO: Look up roles.
    const props = {roles: [
        {id: 1, company: "Gourment Greens", title: "Director of Engineering", lastActive: "2023-07-11"},
        {id: 2, company: "Boomer Beamers", title: "Sr. Director of Entertainment", lastActive: "2023-07-13"}
      ]
    };
    return await ctx.render(props);
  },
};

export default function Roles(props: PageProps) {
  const { roles } = props.data;
  return (
    <>
     <RoleTable roles={roles}/>
    </>
  );
}
