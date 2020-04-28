import express from 'express';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';
import { nextI18next } from '../i18n';
import { parse } from 'url';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 3000;
const app = next({ dev: true });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(cookieParser());

    // use the next-i18next middleware with our i18n configuration
    server.use(nextI18NextMiddleware(nextI18next));
    // handle nextjs routing
    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      return handle(req, res, parsedUrl);
    });

    await server.listen(port);
    // tslint:disable-next-line:no-console
    console.log(`🚀 Ready on http://localhost:${port}`);
  } catch (e) {
    throw e;
  }
})();
