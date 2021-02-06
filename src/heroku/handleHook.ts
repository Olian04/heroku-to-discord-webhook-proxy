import Discord from "../discord";
import { DynoWebhookBody } from "./DynoWehookBody";

export const handleHook = async ({
  path,
  hookBody,
}: {
  path: string;
  hookBody: DynoWebhookBody;
}): Promise<number> => {
  const apiResponse = await Discord.sendHook(hookBody.data.app.name, {
    title: path,
    color: Discord.Color.blue,
    timestamp: new Date(hookBody.created_at).toISOString(),
    fields: [
      {
        name: "name",
        value: "value",
        inline: false,
      },
    ],
  });

  if (apiResponse.ok) {
    console.info(apiResponse.status, apiResponse.statusText);
  } else {
    console.warn(apiResponse.status, apiResponse.statusText);
    console.info("api-response-body-from-warning", await apiResponse.json());
  }
  return apiResponse.status;
};
