import { Buffer } from 'buffer';

export default async function getM3U8(episodeUrl: string) {
	try {
		const neko_data = await (await fetch(episodeUrl)).text();
		const pstream_url = /(else {\n(.*)video\[0] = ')(.*)(';)/gm.exec(neko_data)?.[3] as string;

		const pstream_data = await (await fetch(pstream_url)).text();
		const pstream_script_url = /(https:\/\/www\.pstream\.net\/u\/player-script.*)(" type)/gm.exec(pstream_data)?.[1] as string;

		const pstream_script = await (await fetch(pstream_script_url)).text();

		const m3u8_url_B64 = /e.parseJSON\(atob\(t\).slice\(2\)\)\}\(\"([^;]*)"\),/gm.exec(pstream_script)?.[1] as string;

		const m3u8_url = JSON.parse(Buffer.from(m3u8_url_B64, 'base64').toString('ascii').slice(2))['mmmmmmmmmmmmmmmmmmmm'];
		const m3u8 = (await fetch(m3u8_url)).blob();
		return m3u8;
	} catch (e) {
		return false;
	}
}
