const filterForm = document.forms.filterForm;
const searchForm = document.forms.formSearch;


if (location.search) {
	let params = {};

	const arrayStringParams = location.search.substring(1).split('&');

	for (let stringParam of arrayStringParams) {
		let param = stringParam.split('=');
		let nameParam = param[0];
		let valueParam = param[1];

		if (nameParam in params) {
			params[nameParam].push(valueParam);
		} else {
			params[nameParam] = [valueParam];
		}
	}

	const updateInput = (gInputs, typeParam) => {
		if (Array.isArray(gInputs)) {
			for (let input of gInputs) {
				if (!params[typeParam]) return;
				const param = params[typeParam];
				for (partParam of param) {
					if (partParam === input.value) {
						input.checked = true;
					}
				}
			}
		} else {
			const param = params[typeParam];
			gInputs.value = param;
			if (!params[typeParam]) {
				gInputs.value = '';
			}
		}
	};

	updateInput(filterForm.views, 'views');
	updateInput(filterForm.show, 'show');
	updateInput(filterForm.commentsCount, 'commentsCount');
	updateInput(filterForm.sortBy, 'sortBy');
	updateInput(searchForm.search, 'title');
};

const url = new URL(location.pathname, location.origin);

const addCheckedInput = (nameGroupInput, typeParam) => {
	for (checkbox of nameGroupInput) {
		if (checkbox.checked) {
			url.searchParams.append(typeParam, checkbox.value);
		}
	}
}

filterForm.addEventListener('simbit', (e) => {
	e.preventDefault();


	url.searchParams.delete('tags');
	url.searchParams.delete('views');
	url.searchParams.delete('show');
	url.searchParams.delete('commentsCount');
	url.searchParams.delete('sortBy');

	addCheckedInput(e.target.tags, 'tags');
	addCheckedInput(e.target.views, 'views');
	addCheckedInput(e.target.show, 'show');
	addCheckedInput(e.target.commentsCount, 'comment');
	addCheckedInput(e.target.sortBy, 'sortBy');

	history.replaceState(null, '', url)
});

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();

	url.searchParams.delete('title');

	addCheckedInput(e.target.title, 'title');

	history.replaceState(null, '', url)
})
