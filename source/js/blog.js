const SERVER_URL = 'https://academy.directlinedev.com';
const loaderBlog = document.querySelector('.blog-preloader_js');
const btnNext = document.querySelector('.blog__btn-next_js');
const btnBack = document.querySelector('.blog__btn-back_js');

let LIMIT = 10;

if (!localStorage.getItem('token')) {
  location.pathname = '/';
}

(function () {
  const form = document.forms.filterForm;
  const formSearch = document.forms.formSearch;
  const searchInput = formSearch.elements.search;

  form.addEventListener('submit', (e) => {

    let data = {
      page: 0,

    };

    data.sortBy = ([...form.elements.sortBy])
      .find((radio => radio.checked) || { value: null }).value;
    data.show = ([...form.elements.show])
      .find((radio => radio.checked) || { value: null }).value;
    data.views = ([...form.elements.views])
      .find((radio => radio.checked) || { value: null }).value;
    data.commentsCount = [...form.elements.commentsCount]
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    data.tags = [...form.elements.tags]
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    getData(data);
    setSearchParams(data);
  })

  formSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = searchInput.value.trim();

    let data = {
      page: 0,
      title: title,
    }

    if (!title) {
      searchInput.value = ''
      return;
    }

    console.log(data.title)

    getData(data);
    setSearchParams(data);

    searchInput.value = ''
    history.replaceState(null, '', url);

  })

  form.addEventListener('reset', (e) => {

    LIMIT = 10;

    let data = {
      page: 0,
    };

    console.log('Форма сброшена!');

    searchInput.value = ''
    history.replaceState(null, '', url);

    getData(data);
    setSearchParams(data);
  });



  let xhr = new XMLHttpRequest();
  xhr.open('GET', SERVER_URL + '/api/tags');
  xhr.send();
  showLoader(loaderBlog);
  xhr.onload = () => {
    const tags = JSON.parse(xhr.response).data;
    const tagsBox = document.querySelector('.tag-list_js');
    tags.forEach(tag => {
      const tagHTML = createTag({
        id: tag.id,
        color: tag.color
      });
      tagsBox.insertAdjacentHTML('beforeend', tagHTML);
    })

    const params = getParamsFormLocation();
    setDataToFilter(params);
    getData(params);
    hiddenLoader(loaderBlog);
  }
})();


function getData(params) {
  const result = document.querySelector('.posts-result_js');
  let xhr = new XMLHttpRequest();
  let searchParams = new URLSearchParams();
  searchParams.set('v', '1.0.0');

  if (params.tags && Array.isArray(params.tags) && params.tags.length) {
    searchParams.set('tags', JSON.stringify(params.tags));
  }

  if (params.views && params.commentsCount) {
    let maxComments;
    let minComments;
    let minViews;
    let maxViews;

    switch (params.views.length) {
      case 0: {
        minViews = 0;
        maxViews = 0;
        break;
      }

      default: {
        let value = params.views.split('-');
        minViews = value[0];
        maxViews = value[1];
        break;
      }
    }

    switch (params.commentsCount.length) {
      case 0: {
        break;
      }

      default: {
        minComments = params.commentsCount[0].split('-')[0];
        maxComments = params.commentsCount[params.commentsCount.length - 1].split('-')[1];
        break;
      }
    }

    let filter = {
      "commentsCount": {
        "$between": [minComments, maxComments]
      },
      "views": {
        "$between": [minViews, maxViews]
      }
    };
    searchParams.set('filter', JSON.stringify(filter));
  } else {
    let filter = {};
    searchParams.set('filter', JSON.stringify(filter));
  }

  if (params.show) {
    LIMIT = params.show;
    searchParams.set('limit', params.show);
  } else {
    searchParams.set('limit', LIMIT);
    searchParams.set('offset', (+params.page) * LIMIT);
  }

  if (+params.page && params.show) {
    searchParams.set('offset', (+params.page) * (params.show));
  }

  if (params.title) {
    LIMIT = 40;
    searchParams.set('limit', LIMIT);
    searchParams.set('offset', (+params.page) * LIMIT);
  }

  if (params.sortBy) {
    searchParams.set('sort', JSON.stringify([params.sortBy, 'DESC']));
  }

  xhr.open('GET', SERVER_URL + '/api/posts?' + searchParams.toString());
  xhr.send();
  result.innerHTML = '';
  const links = document.querySelector('.pagination_js');
  links.innerHTML = '';
  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    getSearch(params.title, response.data)
    console.log(response.data, '', response.count);
    let dataPosts = '';
    if (params.title) {
      LIMIT = response.count;
      const filteredItems = response.data.filter(item => {
        return item.title.toLowerCase().indexOf(params.title.toLowerCase()) !== -1;
      });
      console.log(filteredItems)
      filteredItems.forEach(post => {
        dataPosts += cardCreate({
          title: post.title,
          text: post.text,
          photo: post.photo.desktopPhotoUrl,
          photoTablet: post.photo.tabletPhotoUrl,
          photoTablet2x: post.photo.tablet2xPhotoUrl,
          photoMobil: post.photo.mobilePhotoUrl,
          photoMobil2x: post.photo.mobile2xPhotoUrl,
          date: post.date,
          views: post.views,
          commentsCount: post.commentsCount,
          tags: post.tags,
        });
      });
      result.innerHTML = dataPosts;
      const pageCount = Math.ceil(filteredItems.length / LIMIT);
      for (let i = 0; i < pageCount; i++) {
        const link = linkElementCreate(i);
        links.insertAdjacentElement('beforeend', link);
      }
      if (params.page === pageCount - 1) {
        btnNext.setAttribute('disabled', 'disabled');
      } else {
        btnNext.removeAttribute('disabled', 'disabled');
      }
    } else {
      response.data.forEach(post => {
        dataPosts += cardCreate({
          title: post.title,
          text: post.text,
          photo: post.photo.desktopPhotoUrl,
          photoTablet: post.photo.tabletPhotoUrl,
          photoTablet2x: post.photo.tablet2xPhotoUrl,
          photoMobil: post.photo.mobilePhotoUrl,
          photoMobil2x: post.photo.mobile2xPhotoUrl,
          date: post.date,
          views: post.views,
          commentsCount: post.commentsCount,
          tags: post.tags,
        });
      });
      result.innerHTML = dataPosts;
      const pageCount = Math.ceil(response.count / LIMIT);
      for (let i = 0; i < pageCount; i++) {
        const link = linkElementCreate(i);
        links.insertAdjacentElement('beforeend', link);
      }
      if (params.page === pageCount - 1) {
        btnNext.setAttribute('disabled', 'disabled');
      } else {
        btnNext.removeAttribute('disabled', 'disabled');
      }
    }

    if (params.page === 0) {
      btnBack.setAttribute('disabled', 'disabled');
    } else {
      btnBack.removeAttribute('disabled', 'disabled');
    }

    hiddenLoader(loaderBlog);
  }
}

setActivePage();


function getParamsFormLocation() {
  let searchParams = new URLSearchParams(location.search);
  return {
    sortBy: searchParams.get('sortBy'),
    views: searchParams.get('views'),
    commentsCount: searchParams.getAll('commentsCount'),
    show: searchParams.get('show'),
    tags: searchParams.getAll('tags'),
    page: +searchParams.get('page') || 0,
    title: searchParams.get('title') || '',
  };
}

function setSearchParams(data) {
  let searchParams = new URLSearchParams();
  if (data.pages) {
    searchParams.set('page', data.pages);
  } else {
    searchParams.set('page', 0);
  }
  if (data.tags) {
    data.tags.forEach(tag => {
      searchParams.append('tags', tag);
    })
  }
  if (data.commentsCount) {
    data.commentsCount.forEach(comment => {
      searchParams.append('commentsCount', comment);
    })
  }
  if (data.sortBy) {
    searchParams.set('sortBy', data.sortBy);
  }
  if (data.views) {
    searchParams.set('views', data.views);
  }
  if (data.show) {
    searchParams.set('show', data.show);
  }

  if (data.title) {
    searchParams.set('title', data.title);
  }

  history.replaceState(null, document.title, '?' + searchParams.toString());
}

function setDataToFilter(data) {
  const form = document.forms.filterForm;

  form.elements.tags.forEach(checkbox => {
    if (data.tags.includes(checkbox.value)) {
      checkbox.checked = true;
    }
  })
  form.elements.commentsCount.forEach(checkbox => {
    if (data.commentsCount.includes(checkbox.value)) {
      checkbox.checked = true;
    }
  })
  form.elements.sortBy.forEach(radio => {
    if (data.sortBy === radio.value) {
      radio.checked = true;
    }
  });
  form.elements.show.forEach(radio => {
    if (data.show === radio.value) {
      radio.checked = true;
    }
  });
  form.elements.views.forEach(radio => {
    if (data.views === radio.value) {
      radio.checked = true;
    }
  });
}

function linkElementCreate(page) {
  const link = document.createElement('a');
  link.href = '?page=' + page;
  link.innerText = page + 1;
  link.classList.add('pagination__item');

  let params = getParamsFormLocation();
  if (page === +params.page) {
    link.classList.add('pagination__item_active');
  }
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const links = document.querySelectorAll('.pagination__item');
    let searchParams = new URLSearchParams(location.search);
    let params = getParamsFormLocation();
    links[params.page].classList.remove('pagination__item_active');
    searchParams.set('page', page);
    links[page].classList.add('pagination__item_active');
    history.replaceState(null, document.title, '?' + searchParams.toString())
    getData(getParamsFormLocation());
  });



  return link;
}

function setActivePage() {

  btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    let params = getParamsFormLocation();
    let nextPage = +params.page + 1;
    let searchParams = new URLSearchParams(location.search);
    searchParams.set('page', nextPage);
    history.replaceState(null, document.title, '?' + searchParams.toString());
    getData(getParamsFormLocation());
  });

  btnBack.addEventListener('click', (e) => {
    e.preventDefault();
    let params = getParamsFormLocation();
    let previousPage = +params.page - 1;
    let searchParams = new URLSearchParams(location.search);
    searchParams.set('page', previousPage);
    history.replaceState(null, document.title, '?' + searchParams.toString());
    getData(getParamsFormLocation());
  })
}

function getNewDate(date) {
  let dateString = date;
  let dateObj = new Date(dateString);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let formattedDate = `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`;
  return formattedDate;
}

function cardCreate({ title, text, photo, photoMobil, photoMobil2x, photoTablet, photoTablet2x, date, views, commentsCount, tags }) {
  return `
    <div class="card">
        <div>
        <picture class="delivery__img">
            <source srcset="${SERVER_URL}${photoMobil}, ${SERVER_URL}${photoMobil2x} 2x " media="(max-width:650px)" >
            <source srcset="${SERVER_URL}${photoTablet}, ${SERVER_URL}${photoTablet2x} 2x" media="(max-width: 1000px)">
            <source srcset="${SERVER_URL}${photo}" media="(max-width: 1440px)">
            <img src="${SERVER_URL}${photo}" alt="${title}">
        </picture>
        </div>
        <div class="card__content">
        <div class="card__tags-wrapper">
          ${tags.map(item => `<span class="card__tags" style="background: ${item.color}"></span>`).join('')}
        </div>
        <div class="card__info-wrapper">
            <span class="card__info-item">${getNewDate(date)}</span>
            <span class="card__info-item">${views} views</span>
            <span class="card__info-item">${commentsCount} comments</span>
        </div>
        <h2 class="card__title">${title}</h2>
        <p class="card__text">${text}</p>
        <a class="card__link" href="#">Go to this post</a>
        </div>
    </div>
    `
}

function createTag({ id, color }) {
  return `
    <li class="form-filter__tag-item">
        <input class="checkbox-custom checkbox-custom" type="checkbox" id="tags-${id}" name="tags" value="${id}">
        <label style="color: ${color}" class="checkbox-custom__label-tag label_${id}" for="tags-${id}"><span class="checkbox-span"></span></label>
    </li>
    `
}


function getSearch(param, data) {
  if (param) {
    const filteredItems = data.filter(item => {
      return item.title.toLowerCase().indexOf(param.toLowerCase()) !== -1;
    });

    console.log(filteredItems)
  }
}