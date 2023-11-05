import express, { Application, Request, Response, NextFunction } from 'express';
import { Routes } from './src/routes/index';

class App {
    public app: Application;
    public router: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.router.routes(this.app);
    }

    private config(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next();
        });
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}

export default new App().app;
