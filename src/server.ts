import { App } from './app';
import { Datasource } from './db/datasource';

(() => {
    try {
        const ds = new Datasource('sqlite', './database.sqlite3');
        new App('3001', ds).start();
    } catch (error) {
        console.error(`An error occurred: ${JSON.stringify(error)}`);
        process.exit(1);
    }
})();
