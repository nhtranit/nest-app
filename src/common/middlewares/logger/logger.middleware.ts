// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { format } from 'date-fns';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logDirectory = 'logs';

  use(req: Request, res: Response, next: () => void) {
    const now = new Date();
    const logDate = format(now, 'yyyyMMdd');
    const logTime = format(now, 'HH:mm:ss');
    const logFilePath = `${this.logDirectory}/request_logs_${logDate}.txt`;

    const logMessage = `[${logTime}] ${req.method} ${req.originalUrl}\n`;
    const requestLog = `Request Body:\n${JSON.stringify(
      req.body,
      null,
      2,
    )}\n\n`;

    const originalSend = res.send.bind(res);
    res.send = (data: any): any => {
      const responseLog = `Response Status: ${res.statusCode}\nResponse Body:\n${data}\n\n`;
      const log = `${logMessage}${requestLog}${responseLog}=======================================\n`;

      // Kiểm tra folder log đã tạo chưa
      if (!fs.existsSync(this.logDirectory)) {
        fs.mkdirSync(this.logDirectory, { recursive: true });
      }

      fs.appendFile(logFilePath, log, (err) => {
        if (err) {
          console.error('Error writing log:', err);
        }
      });

      originalSend(data);
    };

    next();
  }
}
