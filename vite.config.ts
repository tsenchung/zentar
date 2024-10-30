import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { alphaTab } from "@coderline/alphatab/vite";
import path from 'path';

export default defineConfig({
	plugins: [
		sveltekit(),
		alphaTab({
			assetOutputDir: path.resolve('./static')
		})]
});
