import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { ApiRoute } from './routes/apis/api.routing';
const swaggerFile = require('./swagger_output.json');
const passport = require('./config/passport');


export class App {
  private port = process.env.PORT || 8080;
  private app = express();
  private apiRoute = new ApiRoute();
  private corsOptions = {
    origin: [
      // frontend url
      'http://localhost:3000',
      'http://localhost:5173',
      'https://isport-beginneraboutlife116.vercel.app',
      'https://isport-omega.vercel.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
  };

  constructor() {
    this.setCors();
    this.setApiDoc();
    this.setFormat();
    this.setPassport();
    this.setPath();
    this.setRouter();
  }

  public bootstrap(): void {
    this.app.listen(this.port, () => console.log(`i-sport API app is listening on port ${this.port}`));
  }

  private setCors(): void {
    this.app.use(cors(this.corsOptions));
  }

  private setApiDoc(): void {
    this.app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  private setFormat(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private setPassport(): void {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private setPath(): void {
    this.app.use('/upload', express.static(path.join(__dirname, 'upload')));
  }

  private setRouter(): void {
    this.app.use('/api', this.apiRoute.router);
  }

}
