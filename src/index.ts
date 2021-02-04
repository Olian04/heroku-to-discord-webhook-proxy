import express from "express";
import bodyParser from "body-parser";
import betterLogging, { expressMiddleware } from "better-logging";
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
  }
  console.warn(`Unexpected method: ${req.method}`);
  res.sendStatus(405);
});

app.use((req, res) => {
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
