import betterLogging, { expressMiddleware } from "better-logging";
betterLogging(console);

import express from "express";
import bodyParser from "body-parser";

import Heroku from "./heroku";
import { DynoWebhookBody } from "./heroku/DynoWehookBody";
import { sendStatusResponse } from "./util/sendStatusResponse";

const app = express();

app.use(bodyParser.json());

app.use(
  expressMiddleware(console, {
    path: {
      show: true,
    },
    method: {
      show: true,
    },
    ip: {
      show: false,
    },
    header: {
      show: false,
    },
    body: {
      show: false,
    },
  })
);

app.get("/", (req, res) => {
  // Heart beat endpoint
  sendStatusResponse({
    req,
    res,
    statusCode: 200,
    message: "OK",
  });
});

app.use((req, res, next) => {
  if (req.method.toLocaleLowerCase() !== "post") {
    sendStatusResponse({
      req,
      res,
      statusCode: 405,
      message: `Unexpected HTTP method. Only POST requests are supported.`,
    });
    return;
  }
  next();
});

app.use((req, res, next) => {
  if (req.path === "" || req.path === "/") {
    sendStatusResponse({
      req,
      res,
      statusCode: 404,
      message: `URI can not be index or empty.`,
    });
    return;
  }
  next();
});

app.use(async (req, res) => {
  try {
    const { ok, message } = await Heroku.handleHook({
      path: req.path,
      hookBody: req.body as DynoWebhookBody,
    });
    sendStatusResponse({
      req,
      res,
      statusCode: ok ? 200 : 502,
      message: JSON.stringify(message),
    });
  } catch (err) {
    sendStatusResponse({
      req,
      res,
      statusCode: 500,
      message: `Something unexpected happened. If this issue persists please open an issue at https://github.com/Olian04/heroku-to-discord-webhook-proxy`,
    });
    throw err;
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
