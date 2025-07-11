import * as fs from 'fs';
import * as path from 'path';

export class Logger {
    private logFilePath: string;

    constructor(filename: string){
        const logDir = path.resolve(__dirname, 'logs');
        if (!fs.existsSync(logDir)){
            fs.mkdirSync(logDir);
        }

        this.logFilePath = path.join(logDir, Logger.getTimestampedFilename(filename));
    }

    private write(message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;

        fs.appendFile(this.logFilePath, logMessage, err => {
            if (err) console.error('Failed to write to log file:', err);
        });
    }

    public info(message: string): void {
        this.write(`INFO: ${message}`);
    }

    public error(message: string): void {
        this.write(`ERROR: ${message}`);
    }

    private static getTimestampedFilename(filename: string): string {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');

        return `${filename}_${year}${month}${day}${hour}${minute}${second}.log`;
    }
}