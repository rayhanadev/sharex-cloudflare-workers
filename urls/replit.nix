{ pkgs }: {
	deps = [
		pkgs.jq.bin
		pkgs.esbuild
		pkgs.nodejs-16_x

		pkgs.nodePackages.typescript
		pkgs.nodePackages.typescript-language-server
	];
}