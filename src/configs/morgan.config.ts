import morgan from 'morgan';
import { env } from './config';
import logger from './logger.config';

morgan.token('message', (req: any, res: any) => res.locals.errorMessage || '');

const getIpFormat = () => (env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req: any, res: any) => res.statusCode >= 400,
  stream: { write: (message: any) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req: any, res: any) => res.statusCode < 400,
  stream: { write: (message: any) => logger.error(message.trim()) },
});
