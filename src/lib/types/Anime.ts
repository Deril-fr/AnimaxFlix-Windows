import type Episode from './Episode';
import type Genre from './Genre';

interface Anime {
	id: number;
	title: string;
	title_english: string;
	title_romanji: string;
	title_french: null;
	others: string;
	type: string;
	status: string;
	popularity: number;
	url: string;
	genres: (keyof typeof Genre)[];
	url_image: string;
	score: string;
	start_date_year: string;
	nb_eps: number;
	episodes: Episode[];
	synopsis: string;
	cover: string;
}

export default Anime;
