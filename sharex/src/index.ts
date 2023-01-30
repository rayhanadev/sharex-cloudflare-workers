/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { customAlphabet } from 'nanoid/non-secure'
const id = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10);

import type { Env } from './worker.types';

import urlHandler from './api/urls';
import textHandler from './api/text';
import imageHandler from './api/images';
import fileHandler from './api/files';

export default {
	async fetch(
		request: Request,
		env: Env,
		_ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);
		const { pathname } = url;

		if(pathname === '/') {
			return new Response('ShareX Cloudflare Worker', {
				status: 200,
				headers: { 'Content-Type': 'text/plain' },
			});
		}

		if (pathname.startsWith('/api/urls')) {
			return await urlHandler(request, env);
		}

		if (pathname.startsWith('/api/text')) {
			return await textHandler(request, env);
		}

		if (pathname.startsWith('/api/images')) {
			return await imageHandler(request, env);
		}

		if (pathname.startsWith('/api/files')) {
			return await fileHandler(request, env);
		}

		const body = JSON.stringify({
			error: 'Endpoint not found.',
		});

		return new Response(body, {
			status: 404,
			headers: { 'Content-Type': 'text/plain' },
		});
	},
};