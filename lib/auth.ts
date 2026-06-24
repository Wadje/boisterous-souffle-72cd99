import "server-only";
import { cache } from "react";
import { prisma } from "./prisma";
import { getSession } from "./session";
import { avatarUrl } from "./discord";

export type CurrentUser = {
  id: string;
  discordId: string;
  username: string;
  globalName: string | null;
  avatarUrl: string;
  email: string | null;
  createdAt: Date;
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session.userId) return null;

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return null;

  return {
    id: user.id,
    discordId: user.discordId,
    username: user.username,
    globalName: user.globalName,
    avatarUrl: avatarUrl(user.discordId, user.avatar),
    email: user.email,
    createdAt: user.createdAt,
  };
});
