export type Env = {
	FILES_KV: R2Bucket;
	FILES_BUCKET: R2Bucket;
}

export type FileMetadata = {
	r2: R2Object;
	id: string;
	type: string;
	hash: string;
	url: string;
	delete: string;
}