import fetch, { RequestInit } from "node-fetch";
import { Embed } from "./Embed";

const hookURL = process.env.DISCORD_WEBHOOK;

export const sendHook = (messageUsername: string, embeds: Embed[]) => {
  const requestData: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds,
      username: messageUsername,
    }),
  };
  return fetch(`${hookURL}?wait=true`, requestData);
};
