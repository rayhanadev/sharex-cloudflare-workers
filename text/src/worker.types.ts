export type Env = {
	TEXT_KV: R2Bucket;
}

export type TextMetadata = {
	id: string;
	content: string;
	url: string;
	delete: string;
}