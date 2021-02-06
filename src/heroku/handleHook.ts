import Discord from "../discord";
import { DynoWebhookBody } from "./DynoWehookBody";

const fallbackColor = Discord.Color.white;
const actionToColorMap: {
  [k: string]: number;
} = {
  destroy: Discord.Color.red,
  create: Discord.Color.green,
  update: Discord.Color.blue,
};

export const handleHook = async ({
  path,
  hookBody,
}: {
  path: string;
  hookBody: DynoWebhookBody;
}): Promise<boolean> => {
  const dyno = {
    name: hookBody?.data?.name ?? "Internal error",
    status: hookBody?.data?.state ?? "Internal error",
  };
  const apiResponse = await Discord.sendHook(path, {
    title: `${hookBody.action} ${hookBody.resource}`,
    color: actionToColorMap[hookBody?.action] ?? fallbackColor,
    timestamp: new Date(hookBody?.created_at).toISOString(),
    description: `**Name**: ${dyno.name}\n` + `**Status**: ${dyno.status}`,
  });

  if (!apiResponse.ok) {
    console.warn(
      "[DiscordAPI Response]",
      apiResponse.status,
      apiResponse.statusText,
      await apiResponse.json()
    );
  } else {
    console.info(
      "[DiscordAPI Response]",
      apiResponse.status,
      apiResponse.statusText
    );
  }

  return apiResponse.ok;
};
