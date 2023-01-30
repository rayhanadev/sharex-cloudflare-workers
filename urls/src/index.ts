/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import type { Env, URLMetadata } from './worker.types';

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

		const id = pathname.replace('/', '');
		
		const isMetadata = id.endsWith('+');
		const key = isMetadata
			? id.substring(0, id.length - 1)
			: id;

		if(!key) {
			const body = JSON.stringify({
				error: 'Missing `id` parameter.'
			});
			
			return new Response(body, {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			});
		}
			
		const wireFormat = await env.URLS_KV.get(key).then((res) => res?.text());
		
		const item = wireFormat
			? JSON.parse(wireFormat) as URLMetadata
			: null;

		if (!item) {
			const body = JSON.stringify({
				error: 'Resource not found.',
			});
			
			return new Response(body, {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if(isMetadata) {
			const body = JSON.stringify({ item });
			
			return new Response(body, {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	
		return Response.redirect(item.redirect);
	}
};