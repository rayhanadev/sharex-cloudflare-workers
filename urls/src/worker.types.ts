export type Env = {
	URLS_KV: R2Bucket;
}

export type URLMetadata = {
	id: string;
	redirect: string;
	url: string;
	delete: string;
}