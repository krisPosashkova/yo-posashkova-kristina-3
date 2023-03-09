
const slider = document.querySelector('.slider_js');
const wrapperSlider = slider.querySelector('.slider-wrapper_js');
const innerSlider = wrapperSlider.querySelector('.slider-inner_js');
const buttonNext = slider.querySelector('.button-next_js');
const buttonBack = slider.querySelector('.button-back_js');
const pagination = slider.querySelector('.slider-pagination_js');
const slides = [...document.querySelectorAll('.slider-slide_js')];
const slidesCount = slides.length;
let slideWidth = wrapperSlider.offsetWidth;
let activeSlideIndex = 0;
let animationDuration = 600;
let timerID;
let dots = [];

const timerLogic = () => {
  clearTimeout(timerID);
  innerSlider.style.transition = `transform ${animationDuration}ms`;
  timerID = setTimeout(() => {
    innerSlider.style.transition = '';
  }, animationDuration);
};

const initSlide = (index) => {
  let mar = index * slideWidth
  innerSlider.style.transform = `translateX(${mar * (-1)}px)`;
  timerLogic();
}

function initWidth() {
  slideWidth = wrapperSlider.offsetWidth;
  slides.forEach(slide => {
    slide.style.width = `${slideWidth}px`;
  })
};

const updateStrCount = () => {
  +localStorage.getItem('activeSlideIndex') 
    ? (activeSlideIndex = +localStorage.getItem('activeSlideIndex'))
    : (activeSlideIndex = 0);
  };

const changeActiveDot = (index) => {
  const activeDot = document.querySelector('.slider__dot_active');
  activeDot.classList.remove('slider__dot_active');
  dots[index].classList.add('slider__dot_active');
}; 


const setActiveSlide = (whereTo) => {
  if ( activeSlideIndex < 0 || activeSlideIndex > slidesCount ) return;
  switch (whereTo) {
    case "next":
      if (activeSlideIndex < slidesCount) {
        activeSlideIndex = activeSlideIndex + 1;
        initSlide(activeSlideIndex);
        localStorage.setItem("activeSlideIndex", activeSlideIndex);
        localStorage.getItem('activeSlideIndex');
        buttonBack.removeAttribute("disabled");
      }
      if (activeSlideIndex === slidesCount - 1) {
        buttonNext.setAttribute("disabled", "disabled");
      }
      break;
    case "back":
      if (activeSlideIndex !== 0) {
        activeSlideIndex = activeSlideIndex - 1;
        initSlide(activeSlideIndex);
        localStorage.setItem("activeSlideIndex", activeSlideIndex); 
        localStorage.getItem('activeSlideIndex');
        buttonNext.removeAttribute("disabled");
      }
      if (activeSlideIndex === 0) {
        buttonBack.setAttribute("disabled", "disabled");
      }
      break;
  }
  changeActiveDot(activeSlideIndex);
  timerLogic();
};

  createDots();
  initWidth();
  updateStrCount();

buttonBack.addEventListener("click", () => setActiveSlide("back"));
buttonNext.addEventListener("click", () => setActiveSlide("next"));

window.addEventListener('load', () => {
    initSlide(activeSlideIndex);
    changeActiveDot(activeSlideIndex);
    if (activeSlideIndex === slidesCount -1) {
      buttonNext.setAttribute("disabled", "disabled");
    }
    if (activeSlideIndex === 0) {
      buttonBack.setAttribute("disabled", "disabled");
    }
});

function createDots() {
  for(let i = 0; i < slidesCount; i++) {
    const dot = createDot(i);
    dots.push(dot);
    pagination.insertAdjacentElement('beforeend', dot);
  }
}

function createDot(index) {
  const dot = document.createElement('button');
  dot.classList.add('slider__dot');

  if ( index === activeSlideIndex) {
    dot.classList.add('slider__dot_active');
  }

  dot.addEventListener('click', () => {
    initSlide(index);
    changeActiveDot(index);
    timerLogic();
  })

  return dot;
} 

window.addEventListener('resize', () => {
  initWidth();
  initSlide(activeSlideIndex);
  setActiveSlide(activeSlideIndex);
});