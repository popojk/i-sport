import { Request } from 'express';

interface User {
  id: number;
  role: string;
  token: string;
}
export function getUser (req: Request) {
  return req.user;
}


