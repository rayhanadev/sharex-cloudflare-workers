import { customAlphabet } from 'nanoid/non-secure'
const id = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10);

import type { Env, URLMetadata } from '../worker.types';

const handler = async (request: Request, env: Env): Promise<Response> => {
	const url = new URL(request.url);
	const { pathname, searchParams: params } = url;
	
	const requestApiKey = request.headers.get('X-API-KEY');

	if (request.method !== 'GET' && (!requestApiKey || requestApiKey !== env.SERVER_API_KEY)) {
		const body = JSON.stringify({
			error: 'Invalid API Key.',
		});

		return new Response(body, {
			status: 403,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (request.method === 'GET') {
		const id = pathname.replace('/api/urls', '').startsWith('/')
			? pathname.replace('/api/urls/', '')
			: pathname.replace('/api/urls', '');
		
		const page = params.get('page') === null
			? undefined
			: params.get('page') as string;

		if(id.length === 0) {
			const { objects, ...metadata } = await env.URLS_KV.list({ cursor: page });
			const items: URLMetadata[] = [];

			if(!objects) {
				const body = JSON.stringify({
					items,
					...metadata,
				});
		
				return new Response(body, {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			for(const { key } of objects) {
				const wireFormat = await env.URLS_KV.get(key).then((res) => res?.text());
				if(!wireFormat) continue;
	
				const item = JSON.parse(wireFormat) as URLMetadata;
				items.push(item);
			}

			const body = JSON.stringify({
				items,
				...metadata,
			});

			return new Response(body, {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (id.length < 10) {
			const body = JSON.stringify({
				error: 'Missing `id` parameter.',
			});

			return new Response(body, {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		try {
			const wireFormat = await env.URLS_KV.get(id).then((res) => res?.text());
			
			if(!wireFormat) {
				const body = JSON.stringify({
					error: 'Resource not found',
				});
				
				return new Response(body, {
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				});				
			}
			
			const item = JSON.parse(wireFormat) as URLMetadata;

			const body = JSON.stringify({ item });

			return new Response(body, {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error: any) {
			const body = JSON.stringify({ error: error.message });
			return new Response(body, {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}

	if (request.method === 'POST') {
		type URLRequest = {
			redirect: string;
		}
		
		const { redirect } = await request.json() as URLRequest;

		if (!redirect) {
			const body = JSON.stringify({
				error: 'Missing `redirect` parameter.',
			});

			return new Response(body, {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		try {			
			const key = id();
			
			const data: URLMetadata = {
				id: key,
				redirect,
				url: `https://from.furret.dev/to/${key}`,
				delete: `https://sharex.furret.dev/api/urls/${key}`,
			};
			
			await env.URLS_KV.put(key, JSON.stringify(data));

			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error: any) {
			const body = JSON.stringify({ error: error.message });
			return new Response(body, {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}

	if (request.method === 'DELETE') {
		const id = pathname.replace('/api/urls', '').startsWith('/')
			? pathname.replace('/api/urls/', '')
			: pathname.replace('/api/urls', '');

		if (id.length < 10) {
			const body = JSON.stringify({
				error: 'Missing `id` parameter.',
			});

			return new Response(body, {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		try {
			const wireFormat = await env.URLS_KV.get(id).then((res) => res?.text());
			
			if(!wireFormat) {
				const body = JSON.stringify({
					error: 'Resource not found',
				});
				
				return new Response(body, {
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				});				
			}
			
			const item = JSON.parse(wireFormat) as URLMetadata;
			
			await env.URLS_KV.delete(item.id);

			const body = JSON.stringify({ success: true });

			return new Response(body, {
				status: 204,
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error: any) {
			const body = JSON.stringify({ error: error.message });
			return new Response(body, {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}

	const body = JSON.stringify({
		error: 'Endpoint not found.',
	});

	return new Response(body, {
		status: 404,
		headers: { 'Content-Type': 'application/json' },
	});
}

export default handler;