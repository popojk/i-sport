import { Request } from 'express';

interface User {
  id: number;
  role: string;
  token: string;
  email: string;
}
export function getUser (req: Request) {
  return req.user;
}


