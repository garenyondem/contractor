import express, { Express } from 'express';
import http from 'http';
import { Datasource } from './db/datasource';
import { routes } from './routes';

export class App {
    app: Express;
    port: string;
    httpServer: http.Server | undefined;

    constructor(port: string, ds: Datasource) {
        const app = express();
        app.use(express.json());
        app.set('sequelize', ds.sequelize);
        app.set('models', ds.sequelize.models);

        app.use('/api', routes);

        this.app = app;
        this.port = port;
    }

    public start = () => {
        this.httpServer = this.app.listen(this.port);
        console.info(`http://localhost:${this.port}`);
    };
}
