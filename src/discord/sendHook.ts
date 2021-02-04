import fetch from "node-fetch";
import { Embed } from "./Embed";

export const sendHook = (hookURL: string, embeds: Embed[]) =>
  fetch(`${hookURL}?wait=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds,
    }),
  });
