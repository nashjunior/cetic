import { Request, Response } from "express";

export default class UserController {
  public async getUsers(
    request: Request,
    response: Response
  ): Promise<Response> {
    return response.json({ ok: "ok" });
  }
}
