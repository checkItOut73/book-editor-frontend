import 'module-alias/register';

import path from 'path';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddlewareFlushProxy from '@server/webpackHotMiddlewareFlushProxy';
import webpackDevConfig from '@configs/webpack.dev.config.js';
import { FastifyInstanceWithUse } from '@server/types/FastifyInstaceWithUse';
import { getAppAction } from '@server/UseCase/GetApp/getAppAction';

(async function () {
    const server: FastifyInstanceWithUse = fastify();

    server.register(fastifyStatic, {
        root: path.resolve(process.cwd(), 'dist/browser')
    });

    server.get('/book/:bookId(^\\d+$)', getAppAction);

    if ('development' === process.env.NODE_ENV) {
        const webpackCompiler = webpack(webpackDevConfig);

        await server.register(require('middie'));

        server.use(
            webpackDevMiddleware(webpackCompiler, {
                publicPath: new URL(webpackDevConfig.output.publicPath).origin,
                writeToDisk: false
            })
        );

        server.use(webpackHotMiddlewareFlushProxy(webpackCompiler));
    }

    try {
        await server.listen(3000, '0.0.0.0');
    } catch (error) {
        server.log.error(error);
    }
})();
