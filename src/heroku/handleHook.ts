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

const sequenceResetTimeoutDuration = 2 * 1000; // 2 seconds
let sequenceResetTimeoutID: NodeJS.Timeout | null = null;
let sequenceNumber = 0;

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
    description:
      `**Sequence #**: ${sequenceNumber}\n` +
      `**Name**: ${dyno.name}\n` +
      `**Status**: ${dyno.status}`,
  });

  sequenceNumber += 1;

  if (sequenceResetTimeoutID) {
    clearTimeout(sequenceResetTimeoutID);
  }
  sequenceResetTimeoutID = setTimeout(() => {
    sequenceNumber = 0;
  }, sequenceResetTimeoutDuration);

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
