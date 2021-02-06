import express from "express";
import bodyParser from "body-parser";
import betterLogging, { expressMiddleware } from "better-logging";
import Heroku from "./heroku";
import { DynoWebhookBody } from "./heroku/DynoWehookBody";
betterLogging(console);

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

app.use((req, res, next) => {
  if (req.method.toLocaleLowerCase() === "post") {
    next();
    return;
  }
  res.sendStatus(405);
});

app.use(async (req, res) => {
  try {
    const status = await Heroku.handleHook({
      path: req.path,
      hookBody: req.body as DynoWebhookBody,
    });
    res.sendStatus(status);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
