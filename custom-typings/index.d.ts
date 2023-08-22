declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface AuthInfo { }
    // tslint:disable-next-line:no-empty-interface
    interface User {
      username: string;
      id: number;
   }
}
}