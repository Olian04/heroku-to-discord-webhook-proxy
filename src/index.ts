import express from "express";
import bodyParser from "body-parser";
import betterLogging, { expressMiddleware } from "better-logging";
import Heroku from "./heroku";
betterLogging(console);

const app = express();

app.use(bodyParser.json());
app.use(
  expressMiddleware(console, {
    ip: {
      show: false,
    },
    header: {
      show: false,
    },
    path: {
      show: true,
    },
    body: {
      show: true,
    },
    method: {
      show: true,
    },
  })
);

app.use((req, res, next) => {
  if (req.method.toLocaleLowerCase() === "post") {
    next();
    return;
  }
  console.warn(`Unexpected method: ${req.method}`);
  res.sendStatus(405);
});

app.use(async (req, res) => {
  try {
    const { DynoWebhookBody } = Heroku;

    const status = await Heroku.handleHook({
      path: req.path,
      hookBody: new DynoWebhookBody(req.body),
    });
    res.sendStatus(status);
  } catch {
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
