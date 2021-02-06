import Discord from "../discord";
import { DynoWebhookBody } from "./DynoWehookBody";

const actionToColorMap: {
  [k: string]: number;
} = {
  destroy: Discord.Color.red,
  create: Discord.Color.green,
  update: Discord.Color.blue,
};

const fallbackColor = Discord.Color.white;

export const handleHook = async ({
  path,
  hookBody,
}: {
  path: string;
  hookBody: DynoWebhookBody;
}): Promise<boolean> => {
  const apiResponse = await Discord.sendHook(path, {
    title: `${hookBody.action} ${hookBody.resource}`,
    color: actionToColorMap[hookBody?.action] ?? fallbackColor,
    timestamp: new Date(hookBody?.created_at).toISOString(),
    fields: [
      {
        name: hookBody?.data?.name ?? "Internal error",
        value: hookBody?.data?.state ?? "Internal error",
        inline: false,
      },
    ],
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
