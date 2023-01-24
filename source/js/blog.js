// ссылка на API
const SERVER_URL = 'https://academy.directlinedev.com';

const mainLoader = document.querySelector('.preloader_js');
const LIMIT = 10;

let loaderCount = 0;


const showLoader = () => {
    loaderCount++;
    mainLoader.classList.add('preloader_open');
}

const hideLoader = () => {
    loaderCount--;
    if (loaderCount <= 0) {
    mainLoader.classList.remove('preloader_open');
    loaderCount = 0;
    }
}



(function() {
    const form = document.forms.filterForm;



    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let data = {
            page: 0,
        };

        data.sort = ([...form.elements.sort]).find((radio => radio.checked) || {value: null}).value;
        data.view = ([...form.elements.view]).find((radio => radio.checked) || {value: null}).value;  
        data.tags = [...form.elements.tags].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        data.comment = [...form.elements.comment].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        data.show = ([...form.elements.show]).find((radio => radio.checked) || {value: null}).value;
        
        getData();
        setSearchParams(data);

    
    
    })

    let xhr = new XMLHttpRequest();
    xhr.open('GET', SERVER_URL + '/api/tags');
    xhr.send();
    showLoader();
    xhr.onload = () => {
        const tags = JSON.parse(xhr.response).data;
        const tagsBox = document.querySelector('.tag-list_js');
        tags.forEach(tag => {
            const tagHTML = createTag({
                id: tag.id,
                color: tag.color});
            tagsBox.insertAdjacentHTML('beforeend', tagHTML);
        })

        const params = getParamsFormLocation();
        setDataToFilter(params);
        getData(params);
        hideLoader();
    }
})();


function getParamsFormLocation() {
    let searchParams = new URLSearchParams(location.search);
    return {
        sort: searchParams.get('sort'),       
        view: searchParams.get('view'), 
        comment: searchParams.getAll('comment'), 
        show: searchParams.get('show'),
        tags: searchParams.getAll('tags'),
        page: +searchParams.get('page') || 0,
    };
}

function setSearchParams (data) {
    let searchParams = new URLSearchParams();
    data.tags.forEach(tag => {
        searchParams.append('tags', tag);
    })
    data.comment.forEach(comment => {
        searchParams.append('comment', comment);
    })
    if (data.sort) {
        searchParams.set('sort', data.sort);
    }
    if (data.pages) {
        searchParams.set('page', data.pages);
    } else {
        searchParams.set('page', 0);
    }

    if (data.view) {
        searchParams.set('sort', data.view);
    }
    if (data.show) {
        searchParams.set('show', data.show);
    }
    history.replaceState(null, document.title,'?' + searchParams.toString());
        
    
}

function getData(params) {
    const result = document.querySelector('.posts-result_js');
    let xhr = new XMLHttpRequest();
    let searchParams = new URLSearchParams();
    searchParams.set('v', '1.0.0');
    

    // if (params.tags && Array.isArray(params.tags) && params.tags.lenght) {
    //     searchParams.set('tags', JSON.stringify(params.tags));
    // }

    // let filter = {};

    // searchParams.set('filter', JSON.stringify(filter));

    // searchParams.set('limit', LIMIT);
    // if (+params.page){
    //     searchParams.set('offset', (+params.page) * LIMIT);
    // }

    // if (params.sort) {
    //     searchParams.set('sort', JSON.stringify([params.sort, 'DESC']));
    // }

    xhr.open('GET', SERVER_URL + '/api/posts?');
    xhr.send();
    result.innerHTML = '';
    const links =  document.querySelector('.pagination_js');
    links.innerHTML = '';
    xhr.onload = () => {
        const response = JSON.parse(xhr.response);
        response.data.forEach(post => {
            card = cardCreate({
                title: post.title,
                text: post.text,
                photo: post.desktopPhotoUrl,
                photoTablet: post.tabletPhotoUrl,
                photoTablet2x: post.tablet2xPhotoUrl,
                photoMobil: post.mobilePhotoUrl,
                photoMobil2x: post.mobile2xPhotoUrl,
                date: post.date,
                views: post.views,
                commentsCount: post.commentsCount,
                tags: post.tags,
            })
            result.insertAdjacentHTML('beforeend', card);

            const pageCount = Math.ceil(response.count / LIMIT);
            for(let i = 0; i < pageCount; i++){

            }
        }) 
        hideLoader();
        
    }
}

// function linkElementCreate (page) {
//     const link = document.createElement('a');

// }

function cardCreate ({title, text, photo, photo2x, photoMobil, photoMobil2x, photoTablet, photoTablet2x, date, views, commentsCount, tags}) {
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
            ${tags.map(item => `<span class="card__tags" style="background: ${item.tag.color}"></span>`).join('')}
        </div>
        <div class="card__info-wrapper">
            <span class="card__info-item">${date.slice(0,10).date}</span>
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

function setDataToFilter (data) {
    const form = document.filterForm;
    form.elements.tags.forEach(checkbox => {
        checkbox.checked = data.tags.includes(checkbox.value);
    });
    form.elements.sort.forEach(radio => {
        radio.checked = data.sort === radio.value;
    });
    form.elements.view.forEach(radio => {
        radio.checked = data.sort === radio.value;
    });
    form.elements.comment.forEach(checkbox => {
        checkbox.checked = data.comment.includes(checkbox.value);
    });
    form.elements.tags.forEach(radio => {
        radio.checked = data.sort === radio.value;
    });
}


function createTag({id, color}) {
    return `
    <li class="form-filter__tag-item">
        <input class="checkbox-custom checkbox-custom" type="checkbox" id="tags-${id}" name="tags" value="${id}">
        <label style="color: ${color}" class="checkbox-custom__label-tag label_${id}" for="tags-${id}"><span class="checkbox-span"></span></label>
    </li>
    `
}

