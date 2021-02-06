import fetch from "node-fetch";
import { Embed } from "./Embed";

const hookURL = process.env.DISCORD_WEBHOOK;

export const sendHook = (embeds: Embed[]) =>
  fetch(`${hookURL}?wait=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds,
    }),
  });
