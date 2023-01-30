export type Env = {
	SERVER_API_KEY: string;
	URLS_KV: R2Bucket;
	TEXT_KV: R2Bucket;
	IMAGES_KV: R2Bucket;
	FILES_KV: R2Bucket;
	FILES_BUCKET: R2Bucket;
	IMAGES_BUCKET: R2Bucket;
}

export type FileMetadata = {
	r2: R2Object;
	id: string;
	type: string;
	hash: string;
	url: string;
	delete: string;
}

export type ImageMetadata = {
	r2: R2Object;
	id: string;
	type: string;
	hash: string;
	url: string;
	delete: string;
}

export type TextMetadata = {
	id: string;
	content: string;
	url: string;
	delete: string;
}

export type URLMetadata = {
	id: string;
	redirect: string;
	url: string;
	delete: string;
}