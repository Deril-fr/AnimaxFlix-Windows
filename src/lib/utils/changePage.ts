export default function changePage(page: number, n: number, max: number) {
	if (page + n === max) {
		page = 0;
	} else if (page + n === -1) {
		page = max - 1;
	} else {
		page += n;
	}

	return page;
}
