import { Request, Response } from "express";

import { User } from "models";

// import { Session } from "express-session";

export interface APIContext {
  req: Request & {
    session: {
      user?: User;
    };
  };
  res: Response;
}
