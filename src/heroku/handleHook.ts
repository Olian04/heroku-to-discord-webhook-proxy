import Discord from "../discord";
import { DynoWebhookBody } from "./DynoWehookBody";

export const handleHook = async ({
  path,
  hookBody,
}: {
  path: string;
  hookBody: DynoWebhookBody;
}): Promise<{ ok: boolean; message: object }> => {
  const apiResponse = await Discord.sendHook(path, {
    title: `${hookBody.action} ${hookBody.resource}`,
    color: Discord.Color.blue,
    timestamp: new Date(hookBody.created_at).toISOString(),
    fields: [],
  });

  const respBody = await apiResponse.json();

  if (!apiResponse.ok) {
    console.warn(apiResponse.status, apiResponse.statusText, respBody);
  } else {
    console.info(apiResponse.status, apiResponse.statusText, respBody);
  }

  return {
    ok: apiResponse.ok,
    message: respBody,
  };
};
