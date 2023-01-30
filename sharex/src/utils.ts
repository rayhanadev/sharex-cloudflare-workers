export const sha1 = async (file: File) => {
  const fileData = await file.arrayBuffer();
	
  const digest = await crypto.subtle.digest('SHA-1', fileData);
  const array = Array.from(new Uint8Array(digest));
  
	const hash =  array
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');
	
  return hash;
}