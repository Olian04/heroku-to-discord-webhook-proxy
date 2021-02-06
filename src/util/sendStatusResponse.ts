import { Request, Response } from "express";

export const sendStatusResponse = ({
  req,
  res,
  message,
  statusCode,
}: {
  req: Request;
  res: Response;
  statusCode: number;
  message: string;
}) => {
  res.status(statusCode).json({
    self: req.url,
    statusCode,
    message,
  });
};
