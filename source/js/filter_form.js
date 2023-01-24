if (location.search) {
	let params = {};

	const arrayStringParams = location.search.substring(1).split('&');

	for (let stringParam of arrayStringParams) {
		let param = stringParam.split('=');
		let nameParam = param[0];
		let valueParam = param[1];

		if (nameParam in params) {
			params[nameParam]. push (valueParam);
		} else {
			params [nameParam] = [valueParam];
		}
	}

	const filterForm = document.forms.filterForm;

	const updateInput = (gInputs, typeParam) => {
		for (let input of gInputs) {
			const param = params[typeParam];
			for (partParam of param) {
				if (partParam === input.value) {
					input.checked = true;
				}
			}
		}
	};

	updateInput(filterForm.view, 'view');
	updateInput(filterForm.show, 'show');
	updateInput(filterForm.comment, 'comment');
	updateInput(filterForm.sort, 'sort');
	updateInput(filterForm.tags, 'tags');
};

const url = new URL(location.pathname, location.origin);



filterForm.addEventListener('simbit', (e) => {
	e.preventDefault();


	url.searchParams.delete('tags');
  	url.searchParams.delete('view');
	url.searchParams.delete('show');
	url.searchParams.delete('comment');
	url.searchParams.delete('sort');

	const addCheckedInput = (nameGroupInput, typeParam) => {
		for (checkbox of nameGroupInput) {
			if (checkbox.checked) {
				url.searchParams.append(typeParam,checkbox.value);
			}
		}
	}
	addCheckedInput(e.target.tags, 'tags');
	addCheckedInput(e.target.view, 'view');
	addCheckedInput(e.target.show, 'show');
	addCheckedInput(e.target.comment, 'comment');
	addCheckedInput(e.target.sort, 'sort');

	history.replaceState(null, '', url)
});
