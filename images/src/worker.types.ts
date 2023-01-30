export type Env = {
	IMAGES_KV: R2Bucket;
	IMAGES_BUCKET: R2Bucket;
}

export type ImageMetadata = {
	r2: R2Object;
	id: string;
	type: string;
	hash: string;
	url: string;
	delete: string;
}