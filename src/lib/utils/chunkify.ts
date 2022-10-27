export default function chunkify<T>(array: T[], n: number): T[][] {
	let chunks: T[][] = [];
	for (let i = 0; i < array.length; i += n) {
		chunks.push(array.slice(i, i + n));
	}
	return chunks;
}
