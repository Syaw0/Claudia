import { NextFunction, Request, Response } from "express";
import checkLoggedUserAccess from "../util/checkLoggedUserAccess";
import checkGuestUserAccess from "../util/checkGuestUserAccess";
import checkSession from "../../db/util/checkSession";

const accessibilityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await checkSession(req.cookies);
  if (!result.status) {
    if (checkGuestUserAccess(req.originalUrl)) {
      return res.redirect("/auth");
    }
  } else if (result.status) {
    if (checkLoggedUserAccess(req.originalUrl)) {
      return res.redirect("/mycloud");
    }
  }

  next();
};

export default accessibilityMiddleware;
