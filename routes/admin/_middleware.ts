import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { isAdmin } from "../../lib/store.ts";

export async function handler(
  _req: Request, ctx: MiddlewareHandlerContext,) {
  ctx.state.isAdmin = await isAdmin(ctx.state.userId) || undefined;
  const resp = await ctx.next();
  return resp;
}
