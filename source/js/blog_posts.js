// async function getData() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   return data;
// }


const posts = document.querySelector('.blog-posts_js');
const pagination = document.querySelector('.pagination_js');
const paginationInner = pagination.querySelector('.pagination-inner_js');
const buttonNext = pagination.querySelector('.button-next_js');
const buttonBack = pagination.querySelector('.pagination__button-back_js');
const pagesArray = [
  "здесь будут посты с 1-10",
  "здесь будут посты с 11-20",
  "здесь будут посты с 21-30",
  "здесь будут посты с 31-40",
];

let pagesCount = pagesArray.length;

let currentPage = 1;
let rows = 1;

  const createPages = () => {
    const div = document.createElement("div");
    div.classList.add('posts');
    div.innerText =  activePages ? pagesArray[activePages - 1] : pagesArray[0];
    posts.prepend(div);
  };

function createPagination(arrData, rowPerPage) {
  const paginationInner = document.querySelector('.pagination-inner_js');
  const pagesCount = Math.ceil(arrData.length / rowPerPage);
  const ulEl = document.createElement("div");
  ulEl.classList.add('pagination__list');

  for (let i = 0; i < pagesCount; i++) {
    const liEl = createPaginationItem(i + 1);
    ulEl.appendChild(liEl)
  }
  paginationInner.appendChild(ulEl)
}


  /* function createPagination(arrData, rowPerPage) {
    const paginationInner = document.querySelector('.pagination-inner_js');
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("div");
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = createPaginationItem(i + 1);
      ulEl.appendChild(liEl)
    }
    paginationInner.appendChild(ulEl)
  }


  function createPaginationItem(page) {
    const liEl = document.createElement("button");
    liEl.classList.add('pagination__item')
    liEl.innerText = page

    if (currentPage == page) liEl.classList.add('pagination__item-active');

    // liEl.addEventListener('click', () => {
    //   currentPage = page
    //   displayList(postsData, rows, currentPage)

    //   let currentItemLi = document.querySelector('.pagination__item-active');
    //   currentItemLi.classList.remove('pagination__item-active');

    //   liEl.classList.add('pagination__item-active');
    // })

    return liEl;
  } */

  // displayList(postsData, rows, currentPage);













// const posts = document.querySelector('.blog-posts_js');
// const pagination = document.querySelector('.pagination_js');
// const paginationInner = pagination.querySelector('.pagination-inner_js');
// const buttonNext = pagination.querySelector('.button-next_js');
// const buttonBack = pagination.querySelector('.pagination__button-back_js');



// let activeStr;
// const strArray = [
//   "здесь будут посты с 1-10",
//   "здесь будут посты с 11-20",
//   "здесь будут посты с 21-30"
// ];

// let dots = [];



// let strCount = strArray.length;


// const paginationArray = [...Array(strCount+1).keys()].slice(1);
// // for (let number of paginationArray) {
// //   console.log(number);
// // }

// const updateStrCount = () => {
//   +localStorage.getItem("activeStr") 
//     ? (activeStr = +localStorage.getItem("activeStr"))
//     : (activeStr = 1);
// };

// // создаем страницу постов
// const createStr = () => {
//   const div = document.createElement("div");
//   div.classList.add('posts');
//   div.innerText =  activeStr ? strArray[activeStr - 1] : strArray[0];
//   posts.prepend(div);
// };



// function createDots() {
//   for(let i = 0; i < strCount; i++) {
//     const dot = createDot(i);
//     dots.push(dot);
//     paginationInner.insertAdjacentElement('beforeend', dot);
//   }
// }

// function createDot(index) {
//   const div = document.createElement("button");
//   div.classList.add("pagination__item");
  

//   for (let number of paginationArray) {
//     div.innerText = number;
//   }

//   if ( index === activeStr) {
//     div.classList.add('pagination__item-active');
//   }

//   // dot.addEventListener('click', () => {
//   //   initSlide(index);
//   //   changeActiveDot(index);
//   //   timerLogic();})

//   return div;
// } 


// function displayPagination ()

// createStr();
// createDots();