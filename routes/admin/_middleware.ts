import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { isAdmin } from "../../lib/store.ts";

export async function handler(
  _req: Request, ctx: MiddlewareHandlerContext,) {
  ctx.state.isAdmin = await isAdmin(ctx.state.userId) || undefined;

  if (!ctx.state.isAdmin) {
    return new Response(null, { status: 401 });
  }

  const resp = await ctx.next();
  return resp;
}
