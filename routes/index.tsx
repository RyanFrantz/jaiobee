import FeatureAllRoles from "../components/FeatureAllRoles.tsx";
import FeatureRoleDetails from "../components/FeatureRoleDetails.tsx";
import FreeTrialCTA from "../components/FreeTrialCTA.tsx";
import { Handlers } from "$fresh/server.ts";
import { isAuthenticated } from "../lib/utils.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const isAuthned = isAuthenticated(ctx);
    return ctx.render({ isAuthenticated: isAuthned });
  },
};

export default function Home(props) {
  const { isAuthenticated, error } = props.data;
  return (
    <>
    { isAuthenticated ? (
      <></>
    ) : (
      <FreeTrialCTA />
    )}
      <FeatureAllRoles />
      <FeatureRoleDetails />
    </>
  );
}
