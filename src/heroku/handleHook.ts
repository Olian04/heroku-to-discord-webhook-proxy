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
  ]).then(async (resp) => ({
    ...resp,
    body: await resp.json(),
  }));
  if (apiResponse.status !== 200) {
    console.warn(apiResponse.size, apiResponse.statusText, apiResponse.body);
  }
  return apiResponse.status;
};
