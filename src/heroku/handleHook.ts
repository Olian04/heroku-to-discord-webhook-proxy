import Discord from "../discord";
import { DynoWebhookBody } from "./DynoWehookBody";

export const handleHook = async ({
  path,
  hookBody,
}: {
  path: string;
  hookBody: DynoWebhookBody;
}): Promise<number> => {
  const apiResponse = await Discord.sendHook([
    {
      title: path,
      color: Discord.Color.blue,
      fields: [
        {
          name: "RawData",
          value: JSON.stringify(hookBody, null, 2),
          inline: false,
        },
      ],
    },
  ]);
  if (apiResponse.status !== 200) {
    console.warn(apiResponse.size, apiResponse.statusText, apiResponse.body);
  }
  return apiResponse.status;
};
