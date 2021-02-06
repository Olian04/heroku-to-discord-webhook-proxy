import Discord from "../discord";
import { DynoWebhookBody } from "./DynoWehookBody";

export const handleHook = async ({
  path,
  hookBody,
}: {
  path: string;
  hookBody: DynoWebhookBody;
}): Promise<number> => {
  const apiResponse = await Discord.sendHook(hookBody.data.app.name, [
    {
      title: path,
      color: Discord.Color.blue,
      timestamp: hookBody.created_at.toISOString(),
      fields: [
        {
          name: path,
          value: JSON.stringify(hookBody, null, 2),
          inline: false,
        },
      ],
    },
  ]);

  if (apiResponse.ok) {
    console.info(apiResponse.status, apiResponse.statusText);
  } else {
    console.warn(apiResponse.status, apiResponse.statusText);
  }
  return apiResponse.status;
};
